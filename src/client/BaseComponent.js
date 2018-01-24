import { Component } from 'react';

const bindKeys = (instance: Object, prototype: Object, rootClass: Function) => {
  Object.getOwnPropertyNames(prototype).forEach(key => {
    let property = instance[key];
    if (typeof property === 'function') {
      instance[key] = property.bind(instance);
    }
  });

  if (prototype instanceof rootClass) {
    bindKeys(instance, prototype.__proto__, rootClass);
  }
};

export default class BaseComponent<Props, State> extends Component<Props, State> {
  mounted: boolean;

  state: State;
  props: Props;

  constructor(props: Props) {
    super(props);

    this.mounted = false;

    bindKeys(this, this.__proto__, BaseComponent);
  }

  componentDidMount(): void {
    this.mounted = true;
  }

  componentWillMount(): void {
    // abstract
  }

  componentWillUnmount(): void {
    this.mounted = false;
  }

  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps: Props, prevState: State): void {
    // abstract
  }

  set(stateChange: Object): Promise<mixed> {
    return new Promise(resolve => this.setState(stateChange, resolve));
  }

  setIfMounted(stateChange: Object): Promise<mixed> {
    return this.isComponentMounted() ? this.set(stateChange) : Promise.resolve();
  }

  isComponentMounted(): boolean {
    return this.mounted;
  }
}