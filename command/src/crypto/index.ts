import { handlerNumber, handlerOptions } from '../utils';
import { commandOptions } from '../interface';
import { generateKeyPairSync } from 'crypto';
import { Command } from 'commander';

const name = 'crypto';
const description = '';

const options: commandOptions[] = [
  { flags: 'rsa', values: ' <long>', description: '密钥长度', handler: handlerNumber, command: CreateCommand },
];

function CreateCommand(options: any) {
  // 生成密钥对
  const { publicKey, privateKey } = generateKeyPairSync('rsa', {
    modulusLength: options.Rsa, // 修改密钥长度根据需要
  });

  // 将公钥和私钥以字符串形式输出
  const publicKeyPem = publicKey.export({ format: 'pem', type: 'spki' });
  const privateKeyPem = privateKey.export({ format: 'pem', type: 'pkcs1' });
  console.log('公钥: \n%s\n私钥: \n%s', publicKeyPem, privateKeyPem);
}

export function useCrypto(program: Command) {
  handlerOptions(program.command(name).description(description), options);
}
