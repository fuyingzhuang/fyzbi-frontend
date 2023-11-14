// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** add POST /api/bi/chart/add */
export async function addUsingPOST(options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean_>('/api/bi/chart/add', {
    method: 'POST',
    ...(options || {}),
  });
}
