export class CssUpxProcess {

    constructor(private cog: any) { }

    private rePx: RegExp = /([-]?[\d.]+)up(x)?/;

    private rePxAll: RegExp = /([-]?[\d.]+)upx/g;

    /**
     * 换px转换成upx
     * 
     * @private
     * @param {string} upxStr 
     */
    private upxToPx(upxStr: string) {
        // const px = parseFloat(upxStr);
        // let upxValue: number | string = +(px * (750 / this.cog.designWidth)).toFixed(this.cog.fixedDigits);
        //px = upx / (px2upx.fitWidth / px2upx.designWidth)
        
        //upx = px * (px2upx.fitWidth / px2upx.designWidth)
        const upx = parseFloat(upxStr);
        // let upxValue: number | string = px * (this.cog.fitWidth / this.cog.designWidth);
        let pxValue: number | string = upx / (this.cog.fitWidth / this.cog.designWidth);
        // return { px: upxStr, pxValue: upx, pxValue, upx: pxValue + 'px' };
        // return { px: pxStr, pxValue: px, upxValue, upx: upxValue + 'upx' };
        return { upx: upxStr, upxValue: upx, pxValue, px: pxValue + 'px' };
    }

    /**
     * px转upx
     * 
     * @param {string} text 需要转换文本，例如：10px 12p
     * @return {Object} { px: '10px', pxValue: 10, rem: '1rem', remValue: 1 }
     */
    convert(text: string) {
        let match = text.match(this.rePx);
        if (!match) {
            return null;
        }
        return this.upxToPx(match[1]);
    }

    /** 批量转换 */
    convertAll(code: string): string {
        if (!code) {
            return code;
        }
        return code.replace(this.rePxAll, (word: string) => {
            const res = this.upxToPx(word);
            if (res) {
                return res.px;
            }
            return word;
        });

    }
}
