import ripple from '@tsrx/eslint-plugin'
import rootconfig from '../../eslint.config.js'
import { defineConfig } from 'eslint/config'

export default defineConfig([{ extends: [ripple.configs.recommended] }])
