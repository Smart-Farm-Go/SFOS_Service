import { Command } from 'commander';
import { commandOptions } from '../interface';

export function handlerOptions(program: Command, options: commandOptions[]) {
  const commandMap: { [name: string]: commandOptions['command'] } = options.reduce(function (prev, curr) {
    if (curr.command) return Object.assign(prev, { [curr.flags]: curr.command });
    return prev;
  }, {});

  for (const opt of options) {
    const flags = `-${opt.flags}` + (opt.alias ? `, -${opt.alias}` : '') + (opt.values || '');
    program = program.option(flags, opt.description, opt.handler || undefined, opt.default || undefined);
  }

  program.action(function (options) {
    const keys = Object.keys(options).map(v => v.toLowerCase());
    for (const key of keys) {
      if (commandMap.hasOwnProperty(key)) {
        commandMap[key](options);
      }
    }
  });
}

export function handlerNumber(value: string) {
  return isNaN(Number(value)) ? undefined : Number(value);
}

export function handlerBoolean(value: string) {
  return value === 'true' || value === 'false' ? value === 'true' : undefined;
}
