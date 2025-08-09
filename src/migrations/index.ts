import * as migration_20250809_160321 from './20250809_160321';

export const migrations = [
  {
    up: migration_20250809_160321.up,
    down: migration_20250809_160321.down,
    name: '20250809_160321'
  },
];
