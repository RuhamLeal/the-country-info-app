export class BaseController {
  public output(data: { [key: string]: unknown }, message: string, code: number) {
    return {
      status: 'success',
      code,
      message,
      data
    }
  }
}