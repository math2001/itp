#!/usr/bin/env node
"use strict";

const {readdirSync, readFile, writeFile} = require('fs')
const {homedir} = require('os')
const cp = require('node-cp')
const handlebars = require('handlebars')
const path = require('path')

const CWD = process.cwd()

const TEMPLATES_DIR = homedir() + '/.templates/'

function getVariables() {
    return {
        directory: path.basename(CWD),
        cwd: CWD
    }
}

function copyTemplate(file, to, variables) {
    return new Promise(() => {
        readFile(file, 'utf-8', (err, content) => {
            if (err) throw err
            writeFile(to, handlebars.compile(content)(variables), 'utf-8', err => {
                if (err) throw new err
            })
        })
    })
}

function main(files) {
    if (files.indexOf('--help') !== -1) {
        console.error('$ template files...')
        console.error('\nCopies files from ~/template/ to your current working directory')
        console.error('\nIf no arguments are specified, just lists the templates.')
        console.error('\nSee https://github.com/math2001/template for more information')
        console.error(`about template variables`)
        return
    }
    if (files.length === 0) {
        try {
            console.log(readdirSync(TEMPLATES_DIR).join('\n'))
        } catch (err) {
            console.error(`${TEMPLATES_DIR} doesn't exists. Create it and put your templates in there.`)
        }
        return
    }
    const variables = getVariables()
    for (let name of files) {
        copyTemplate(TEMPLATES_DIR + name, CWD + '/' + name, variables).catch(err => {
            console.error(`Could not copy the template ${name}`)
            console.error(err)
        })
    }
}

main(process.argv.slice(2))
