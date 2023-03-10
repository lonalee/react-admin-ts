import { stringify } from 'query-string';
import { fetchUtils, DataProvider } from 'ra-core';

export default (
  apiUrl: string,
  httpClient = fetchUtils.fetchJson
): DataProvider => ({
  /**
   * @param resource
   * @param params
   * offset, filter->{startDate,endDate,status,store,deleteEndDate,deleteStartDate,release}
   * @returns
   */
  getList: (resource, params) => {
    const { page, perPage } = params.pagination;
    // const { field, order } = params.sort;
    const query = {
      ...fetchUtils.flattenObject(params.filter),
      offset: (page - 1) * perPage,
      limit: perPage,
    };

    const url = `${apiUrl}/${resource}?${stringify(query)}`;

    return httpClient(url).then(({ headers, json }) => {
      // if (!headers.has('x-total-count')) {
      //   throw new Error(
      //     'The X-Total-Count header is missing in the HTTP Response. The jsonServer Data Provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare X-Total-Count in the Access-Control-Expose-Headers header?'
      //   );
      // }

      const { isLast, totalCount, projectList } = json;
      // TODO:getList의 모듈화 -> 불가능??
      /**
       * 1. fetch된 rows등을 mod하는 함수를 작성하자. -> 의미없음 (데이터 키밸류들이 다 다르므로)
       * 2. 스위치문을 작성해서 resource별로 각기 다른 함수로 처리...
       */
      const data = projectList.map((row: any) => ({
        appleReleased: row.appleReleased ? '출시' : '미출시',
        appleReleasedIndate: row.appleReleasedIndate ?? '-',
        appleReleasedUrl: row.appleReleasedUrl ?? '-',
        avgDAU: row.avgDAU ?? '-',
        avgMAU: row.avgMAU ?? '-',
        companyName: row.companyName ?? '-',
        googleReleased: row.googleReleased ? '출시' : '미출시',
        googleReleasedIndate: row.googleReleasedIndate ?? '-',
        googleReleasedUrl: row.googleReleasedUrl ?? '-',
        id: row.id ?? '-',
        inDate: row.inDate ?? '-',
        plan: row.plan ?? '-',
        status: row.status === 'n' ? '정상' : row.status === 's' ? '정지' : '-',
        title: row.title ?? '-',
      }));
      return {
        isLast,
        data,
        total: totalCount,
      };
    });
  },

  getOne: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => {
      // const newData = {} // 생략
      return {
        data: { ...json, id: json.gameId ?? Math.random() },
      };
    }),

  getMany: (resource, params) => {
    const query = {
      id: params.ids,
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;
    return httpClient(url).then(({ json }) => ({ data: json }));
  },

  getManyReference: (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      ...fetchUtils.flattenObject(params.filter),
      [params.target]: params.id,
      _sort: field,
      _order: order,
      _start: (page - 1) * perPage,
      _end: page * perPage,
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;

    return httpClient(url).then(({ headers, json }) => {
      return {
        data: json,
        total: 255,
      };
    });
  },

  update: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: 'PUT',
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({ data: json })),

  // json-server doesn't handle filters on UPDATE route, so we fallback to calling UPDATE n times instead
  updateMany: (resource, params) =>
    Promise.all(
      params.ids.map((id) =>
        httpClient(`${apiUrl}/${resource}/${id}`, {
          method: 'PUT',
          body: JSON.stringify(params.data),
        })
      )
    ).then((responses) => ({ data: responses.map(({ json }) => json.id) })),

  create: (resource, params) =>
    httpClient(`${apiUrl}/${resource}`, {
      method: 'POST',
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({
      data: { ...params.data, id: json.id },
    })),

  delete: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: 'DELETE',
    }).then(({ json }) => ({ data: json })),

  // json-server doesn't handle filters on DELETE route, so we fallback to calling DELETE n times instead
  deleteMany: (resource, params) =>
    Promise.all(
      params.ids.map((id) =>
        httpClient(`${apiUrl}/${resource}/${id}`, {
          method: 'DELETE',
        })
      )
    ).then((responses) => ({ data: responses.map(({ json }) => json.id) })),
});
