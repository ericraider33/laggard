export class TkoUtil
{
    static async loadHtml(path)
    {
        let response = await fetch(path);
        return await response.text();
    }
}
window.loadHtml = TkoUtil.loadHtml;
