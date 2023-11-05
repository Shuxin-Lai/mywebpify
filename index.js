#!/usr/bin/env node

const pkg = require('./package.json')
const fs = require('fs')
const path = require('path')
const minimist = require('minimist')

const argv = minimist(process.argv.slice(2))

console.log(`${pkg.name} -s SOURCE_DIR -t TARGET_DIR`)
console.log('SOURCE_DIR: required')
console.log('TARGET_DIR: optional. {SOURCE_DIR}/output by default')

const quality = argv.q || argv.quality || '86'
const imgSourceDir = argv.s || argv.source
const imgTargetDir = argv.t || argv.target || path.resolve(imgSourceDir, 'output')

const { compress } = require('compress-images/promise');
const input = path.resolve(imgSourceDir, './**/*.{jpg,JPG,jpeg,JPEG,png}');
const output = path.join(imgTargetDir, '/');

if (imgSourceDir === undefined) {
  throw new Error('source is required')
}

console.log(`start(quality=${quality}): ${input} -> ${output}`)
const processImages = async () => {
  const result = await compress({
    source: input,
    destination: output,
    enginesSetup: {
      jpg: { engine: 'webp', command: ['-q', quality] },
      png: { engine: 'webp', command: ['-q', quality] },
    }
  });

  const { statistics, errors } = result;
  // statistics - all processed images list
  // errors - all errros happened list
};

processImages();