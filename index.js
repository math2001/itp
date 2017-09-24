#!/usr/bin/env node
"use strict";

const {readdirSync, readFile, writeFile, existsSync} = require('fs')
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

function consumeBoolean(args, name) {
    let index = args.indexOf('--' + name)
    if (index === -1) return false
    args.splice(index, 1)
    return true
}

function parseArgs(argv) {
    const args = Object.create(null)
    args.help = consumeBoolean(argv, 'help')
    args.force = consumeBoolean(argv, 'force')
    args.files = Array.from(argv)
    argv.splice(0, Infinity)

    if (args.port !== null) args.port = parseInt(args.port)
    return args
}

function copyTemplate(file, to, variables, force) {
    return new Promise((resolve, reject) => {
        if (!force && existsSync(to)) {
            return reject(`${file} already exists. Use --force to overwrite.`)
        }
        readFile(file, 'utf-8', (err, content) => {
            if (err) throw err
            writeFile(to, handlebars.compile(content)(variables), 'utf-8', err => {
                if (err) throw new err
            })
        })
    })
}

function main(args) {
    args = parseArgs(args)
    if (args.help) {
        console.error('$ template files...')
        console.error('\nCopies files from ~/template/ to your current working directory')
        console.error('\nIf no arguments are specified, just lists the templates.')
        console.error('\nSee https://github.com/math2001/template for more information')
        console.error(`about template variables`)
        return
    }
    if (args.files.length === 0) {
        try {
            console.log(readdirSync(TEMPLATES_DIR).join('\n'))
        } catch (err) {
            console.error(`${TEMPLATES_DIR} doesn't exists. Create it and put your templates in there.`)
        }
        return
    }
    const variables = getVariables()
    for (let name of args.files) {
        copyTemplate(TEMPLATES_DIR + name, CWD + '/' + name, variables, args.force).catch(err => {
            console.error(`Could not copy the template ${name}`)
            console.error(err)
        })
    }
}

main(process.argv.slice(2))
