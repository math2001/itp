# `itp` – Insert template please

<a href="https://gitmoji.carloscuesta.me" target="_blank"><img src="https://camo.githubusercontent.com/2a4924a23bd9ef18afe793f4999b1b9ec474e48f/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6769746d6f6a692d253230f09f989c253230f09f988d2d4646444436372e7376673f7374796c653d666c61742d737175617265" alt="Gitmoji" data-canonical-src="https://img.shields.io/badge/gitmoji-%20😜%20😍-FFDD67.svg?style=flat-square" style="max-width:100%;"></a>

`itp` is a simple manager for template. It's useful to create boilerplate for
READMEs, gitignores, etc... It isn't a huge beast with bells and whistle. It
just does the job.

## Installation

```bash
npm install --global itp
```

Or if you have `yarn` (better IMO):

```bash
yarn global add itp
```


## Usage

It's very simple. You create `.templates` folder in your HOME directory, and
inside, you put it all your template. Then, all you have to do is:

```bash
~/some/where $ itp filename
```

`~/.templates/filename` will be parsed and compiled by [handlebars][] and then
`~/some/where/filename` will be written.

If the destination already exists, you have to use the `--force` flag, otherwise
you'll get a warning and it won't do anything.

Tip: you can do more than one template at a time, for example:

```bash
~/my/new/repository $ itp README.md .gitignore 
```

### Variables

In your template, you have access to the following variables:

| Name        | Description                               | Example       |
|-------------|-------------------------------------------|---------------|
| `cwd`       | The path to the current working directory | `~/tools/itp` |
| `directory` | The last directory in `cwd`               | `itp`         |

Feel free to raise an issue/pull request if you need some other variables :wink:

[handlebars]: http://handlebarsjs.com/
