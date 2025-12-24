import { afterEach, describe, expect, test } from 'bun:test';
import { defaultConfig } from '../types.js';
import { clearConfigCache, defineConfig, getConfig, loadQConfig } from './config.js';

describe('config', () => {
  afterEach(() => {
    clearConfigCache();
  });

  describe('defineConfig', () => {
    test('returns the config object unchanged', () => {
      const config = { model: 'opus' as const };
      expect(defineConfig(config)).toEqual(config);
    });

    test('accepts partial config', () => {
      const config = defineConfig({
        model: 'haiku',
        maxTokens: 2048,
      });
      expect(config.model).toBe('haiku');
      expect(config.maxTokens).toBe(2048);
    });
  });

  describe('loadQConfig', () => {
    test('returns default config when no config file exists', async () => {
      // Load from a temp directory with no config
      const config = await loadQConfig('/tmp');
      expect(config.model).toBe(defaultConfig.model);
      expect(config.maxTokens).toBe(defaultConfig.maxTokens);
      expect(config.theme).toBe(defaultConfig.theme);
    });

    test('merges nested objects with defaults', async () => {
      const config = await loadQConfig('/tmp');
      expect(config.context.git).toBe(defaultConfig.context.git);
      expect(config.context.cwd).toBe(defaultConfig.context.cwd);
      expect(config.safety.confirmDestructive).toBe(defaultConfig.safety.confirmDestructive);
    });
  });

  describe('getConfig', () => {
    test('returns default config before loading', () => {
      const config = getConfig();
      expect(config).toEqual(defaultConfig);
    });

    test('returns loaded config after loadQConfig', async () => {
      await loadQConfig('/tmp');
      const config = getConfig();
      expect(config.model).toBe(defaultConfig.model);
    });
  });

  describe('clearConfigCache', () => {
    test('clears the cached config', async () => {
      await loadQConfig('/tmp');
      clearConfigCache();
      // After clearing, getConfig should return default
      expect(getConfig()).toEqual(defaultConfig);
    });
  });
});
