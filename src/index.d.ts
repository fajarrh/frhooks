export = FRHooks;
export as namespace FRHooks;

declare namespace FRHooks {
  type Routes = string | [string, { [key: string]: any }];
  /**
   * @name FetchProps
   * @description if you use react >18 disable strict mode for one request
   * @example <caption>Example Props for useFetch</caption>
   * const route = '/example' | ['/example/:id', {id: 1}];
   * const {loading, data, query, setQuery} = useFetch(route, {selector: (resp) => resp.data, defaultValue: {}, deps: []})
   */
  interface FetchProps<T> {
    selector: (resp: import("axios").AxiosResponse) => any;
    defaultParams?: { [key: string]: any };
    deps: any[];
    config?: import("axios").AxiosRequestConfig;
  }

  type UseFetch<T> = {
    loading: boolean;
    data: T;
    query: object;
    error: any;
    setQuery: <S = T>(value: Partial<S>) => void;
  };

  /**
   *
   * @param route {string} - url or [url, {bind}]
   * @param props {FetchProps<T>} - Option
   * @description This function for fetch data from API
   * @example <caption>Example useFetch </caption>
   * ```
   *    const route = '/example' | ['/example/:id', {id: 1}];
   *  
   *    const {loading, data, query, setQuery} = useFetch(route, {selector: (resp) => resp.data, defaultValue: {}, deps: []})
   * ```
   */
  function useFetch<T>(route: Routes, props: FetchProps<T>): UseFetch<T>;
}
