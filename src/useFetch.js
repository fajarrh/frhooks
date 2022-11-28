/**
 * @author Fajar Rizky Hidayat <fajarrizkyhidayat@gmail.com>
 */
import { useMemo } from "react";
import { useState, useEffect, useCallback } from "react";
import { skipParams, route as routes } from "./utils";
import axios from "axios";
import _ from "lodash";

const useFecth = (route, props) => {
  let abort = new AbortController();
  const [params, setParams] = useState({});
  const [data, setData] = useState({
    error: {},
    data: {},
    loading: false,
  });

  const setQuery = useCallback(
    (value) => {
      _.debounce(() => setParams({ ...params, ...value }), 60)();
    },
    [params]
  );

  const getData = async () => {
    try {
      setData((state) => ({ ...state, loading: true }));
      const resp = await axios.get(
        routes(
          typeof route === "object" ? route[0] : route,
          typeof route === "object" ? route[1] : {}
        ),
        {
          ...props.config,
          signal: abort.signal,
          params: {
            ...props.defaultParams,
            ...skipParams(params),
          },
        }
      );
      setData((state) => ({ ...state, data: props.selector(resp) }));
    } catch (error) {
      setData((state) => ({ ...state, error }));
    } finally {
      setData((state) => ({ ...state, loading: false }));
    }
  };

  useEffect(() => {
    getData();
    return () => {
      abort.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params, ...props.deps]);

  const memoize = useMemo(() => data.data, [data]);
  return {
    loading: data.loading,
    data: memoize,
    error: data.error,
    query: params,
    setQuery,
  };
};

export default useFecth;
