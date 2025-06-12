# AAStar SDK
It is a sdk and demo show **for developers** to build their own applications.
If you are a **end-user**, check our website: [https://aastar.io](https://aastar.io) for more user demos.

## Components introduction in a word
1. AirAccount 
Control your crypto assets only by you. 🤑
2. SuperPaymaster 
Pay gas seamlessly by your retweet. 📡
3. CometENS 
Naming your crypto address meaningful. 🎖️
4. OpenPNTS 
Issue your own PNTs. 🪙
5. OpenCards 
Issue your own cards. 💳
6. Arcadia 
Issue community chain games and play. 🎲
7. COS72 
Manage your group or community. 🍄
8. Rain Computing/Edge Computing/SDSS Nodes :cloud_with_rain:
Merge account and gas and bundler and even RPC ability into one node backend.

## NPM packages

### install 
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

for create-cos72-app
```
pnpm install -g create-cos72-app
create-cos72-app my-app
brew tap aastar/cos72
brew install cos72

brew upgrade cos72

brew uninstall --cask cos72
brew untap aastar/cos72
```


### Use sdk 
it is a demo show or test for developers to know how to use AAStar infrastructure.
it is a transaction builder for AAStar infrastructure.
use all the high level features of AAStar infrastructure.
1. create AA account
2. get gas sponsor
3. send transaction(or batch transactions)
4. get transaction status

### Use airaccount
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

### Use superpaymaster
Embbeded into AirAccount, but provide ERC20 gas token ability for any community individually with OpenPNTs and OpenCards.

### Use cometens
Embbeded into AirAccount, but provide set your own ENS name for your community individually.

### Use openpnts
Issue your own PNTs.

### Use opencards
Issue your own cards like gas card.

### Use arcadia
Issue your own games or roles online and onchain.

### Use cos72
Manage your group or community.

### SDSS
Just introduce it. It is not a SDK.
now