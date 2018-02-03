
class UtilService {
  readMeta(name: string): ?string {
    const element = document.querySelector(`meta[name=${name}]`);
    return element ? element.getAttribute('content') : null;
  }

  extractText(html: string) {
    const dom = (new DOMParser).parseFromString(html || '', 'text/html');
    const text = dom.documentElement && dom.documentElement.textContent;
    return (!text || text == 'null') ? '' : text;
  }
}

export default new UtilService();