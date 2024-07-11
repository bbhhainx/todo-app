export interface IResponse {
  ok: (data: any) => Response;
  err: (error: any) => Response;
}
