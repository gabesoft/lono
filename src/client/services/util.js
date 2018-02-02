
class UtilService {
  readMeta(name: string): ?string {
    const element = document.querySelector(`meta[name=${name}]`);
    return element ? element.getAttribute('content') : null;
  }
}

export default new UtilService();