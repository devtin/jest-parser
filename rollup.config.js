import { name, version, author, license } from './package.json'

const cleanName = name.indexOf('/') >= 0 ? name.split('/')[1] : name
const banner = `/*!
 * ${ name } v${ version }
 * (c) 2021-${ new Date().getFullYear() } ${ author }
 * ${ license }
 */`

export default [
  {
    input: 'src/index.js',
    output: [
      {
        file: `dist/${ cleanName }.js`,
        format: 'cjs',
        banner,
        preferConst: true,
      },
    ],
  },
  {
    input: 'src/index.js',
    output: [
      {
        file: `dist/${ cleanName }.mjs`,
        format: 'esm',
        banner,
        preferConst: true,
      }
    ],
  },
]
