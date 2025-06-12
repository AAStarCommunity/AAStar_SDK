# AAStar
It is a components collection, all projects, SDK or npm packages in AAStar infrastructure.
It is a demo show **for developers** to build their own applications.
If you are a **end-user**, check our website: [https://aastar.io](https://aastar.io) for more user demos.

## AAStar npm packages collection


You can use 
```
pnpm install @aastar/airaccount
@aastar/superpaymaster
@aastar/cometens
@aastar/openpnts
@aastar/opencards
@aastar/arcadia
@aastar/cos72

or just try:
pnpm install @aastar/sdk
```
or 
```
pnpm install aastar
```

## For developers
Why do you install this package?

### sdk
it is a demo show or test for developers to know how to use AAStar infrastructure.
it is a transaction builder for AAStar infrastructure.
use all the high level features of AAStar infrastructure.
1. create AA account
2. get gas sponsor
3. send transaction(or batch transactions)
4. get transaction status

### airaccount
Provide a moveable\self-custody\crypto account with life cycle service.
Permissionless.
Trustless.
Decentralized.
In 3 steps: bind, send, move(recover)

#### bind
bind your web2 account or email to your crypto AA account.
including create a AA account or EOA account with your fingerprint.
including set some guardians for your AA account social recovery.
swagger: [https://swagger.aastar.io](https://swagger.aastar.io)

#### send
send transaction(or batch transactions) to the blockchain.
5 types transactions:
1. send ETH,ERC20,ERC721
2. deploy contract
3. call contract
4. gasless transaction
5. social recovery


#### move(recover)
move or social recovery your AA account with a new private key.
we have some new ideas about it.

### superpaymaster
Embbeded into AirAccount, but provide ERC20 gas token ability for any community individually with OpenPNTs and OpenCards.

### cometens
Embbeded into AirAccount, but provide set your own ENS name for your community individually.

### openpnts
Issue your own PNTs.

### opencards
Issue your own cards like gas card.

### arcadia
Issue your own games or roles online and onchain.

### cos72
Manage your group or community.