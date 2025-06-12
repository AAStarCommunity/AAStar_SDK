1. npm adduser
2. npm whoami

or
1. npm login --scope=@aasstar
2. npm whoami
confirm you are admin or owner who has package rights


new package flow:

mkdir my-package
cd my-package
npm init -y


npm install --save-dev jest
npm install --save-dev eslint prettier
npx eslint --init


npm run build

npm publish --access public


修复bug：npm version patch（例如，1.0.0 → 1.0.1）

添加功能：npm version minor（例如，1.0.0 → 1.1.0）

破坏性变更：npm version major（例如，1.0.0 → 2.0.0）

npm publish

npm deprecate @aasstar/my-package@1.0.0 "This version is deprecated, please upgrade to 2.0.0"

