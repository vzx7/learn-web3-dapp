import type { NextApiRequest, NextApiResponse } from "next";
import { TezosToolkit } from "@taquito/taquito";
import { importKey } from '@taquito/signer';
import { getTezosUrl } from "@tezos/lib";

export default async function connect(
  req: NextApiRequest, 
  res: NextApiResponse<string>
) {
  try {
    const { mnemonic, email, password, secret } = req.body

    const url = getTezosUrl();
    const tezos = new TezosToolkit(url);

    await importKey(
        tezos,
        email,
        password,
        mnemonic,
        secret
      )

    res.status(200).json('Activation of the account ok');
  } catch (error) {
    console.log('error', error)
    res.status(500).json('Activation of the account failed');
  }
}
