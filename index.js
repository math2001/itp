#!/usr/bin/env node
"use strict";

const {readdirSync} = require('fs')
const {homedir} = require('os')
const cp = require('node-cp')

const TEMPLATES_DIR = homedir() + '/.templates/'

function listTemplates(from) {
    return readdirSync(from)
}

function main(files) {
    const CWD = process.cwd()
    for (let name of files) {
        try {
            cp.sync(TEMPLATES_DIR + name, to)
        } catch (err) {
            console.error(`Could not copy the template ${name}`)
            console.error(err)
        }
    }
}

main(process.argv.slice(2))
