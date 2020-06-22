export default interface Advisor {
  isFirstInput(id: string): boolean;
  isInput(id: string): boolean;
  isOutput(id: string): boolean;
  isLastOutput(id: string): boolean;
  getCode(id: string): string;
}
