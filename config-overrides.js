//参考配置链接：http://www.npmjs.com/package/customize-cra
const {override,addDecoratorsLegacy}=require("customize-cra");

module.exports=override(
    addDecoratorsLegacy(),//配置装饰器模式
)