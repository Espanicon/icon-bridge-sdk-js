declare const IconBridgeSDK: any;
declare type Provider = {
  hostname: string;
  nid?: null | number;
};
declare type InputParams = {
  useMainnet: null | boolean;
  iconProvider?: Provider;
  bscProvider?: Provider;
  abiData?: unknown;
};
declare class IconBridgeSDKNode extends IconBridgeSDK {
  bsc: any;
  icon: any;
  constructor(inputParams?: InputParams);
}
export = IconBridgeSDKNode;
