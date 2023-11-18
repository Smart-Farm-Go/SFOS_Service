import { CommandName, CommandOptionsName } from '@common/command';
import { CommandOption, CommandOptions } from '@common/command';
import { ModulesContainer } from '@nestjs/core';
import { Injectable } from '@nestjs/common';
import { Command } from 'commander';
import * as process from 'process';

@Injectable()
export class AppService {
  private program: Command;

  constructor(private readonly container: ModulesContainer) {
    const version = '0.0.1';
    const name = 'Smart Farm Cli';
    const description = 'commands 工具将为 Smart Farm OS 提供命令行工具。用于程序配置，用户控制，程序监控等，辅助命令行工具。';
    //
    this.program = this.createCommand(name, version, description);
  }

  createCommand(name: string, version = '', description = '') {
    const program = new Command();
    program.name(name);
    if (version) program.version(version);
    if (description) program.description(description);
    return program;
  }

  async run() {
    const modules = Array.from(this.container.values()).map(module => module.providers.values());
    for (const providerModule of modules) {
      for (const provider of providerModule) {
        const { instance } = provider;
        if (!instance || !instance.constructor) {
          continue;
        }
        const meta = Reflect.getMetadata(CommandName, instance.constructor) as CommandOption;
        if (meta) this.addCommand(instance, meta);
      }
    }
    await this.program.parseAsync();
  }

  addCommand(instance: any, meta: CommandOption) {
    const proto = Object.getPrototypeOf(instance);
    const methodNames = Object.getOwnPropertyNames(proto).filter(v => v !== 'constructor');
    const options = methodNames.reduce((prev, command) => {
      let valOption = Reflect.getMetadata(CommandOptionsName, proto[command]) || [];
      if (!valOption.length) return prev;
      if (valOption.length === 1) valOption[0].isCommand = true;
      //
      for (const item of valOption) {
        if (item.isCommand) item.command = proto[command];
      }
      return prev.concat(valOption);
    }, []);
    //
    const newCommand = this.createCommand(meta.name, meta.version, meta.description);
    const commandMap: { [name: string]: CommandOptions['command'] } = options.reduce(function (prev, curr) {
      if (curr.command) return Object.assign(prev, { [curr.flags]: curr.command });
      return prev;
    }, {});
    for (const opt of options) {
      const flags = opt.alias && opt.flags ? `-${opt.alias}, --${opt.flags}` : `-${opt.alias || opt.flags}`;
      newCommand.option([flags, opt.values].join(' '), opt.description, opt.handler || undefined, opt.default || undefined);
    }
    newCommand.action(async function (items) {
      const keys = Object.keys(items).map(v => v.toLowerCase());
      for (const key of keys) {
        if (commandMap.hasOwnProperty(key)) {
          await commandMap[key](items);
        }
      }
      process.exit(0);
    });
    this.program.addCommand(newCommand);
  }
}
