export = FRHooks;
export as namespace FRHooks;

declare namespace FRHooks {
  type Routes = string | [string, { [key: string]: any }];

  interface FetchProps<T> {
    selector: (resp: import("axios").AxiosResponse<any>) => any;
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
   * @param url {string} - url or [url, {bind}]
   * @param props {FetchProps<T>} - Option
   * @description This function for fetch data from API
   * @example <caption>Example useFetch </caption>
   * ```
   *    const url = '/example' | ['/example/:id', {id: 1}];
   *    const {loading, data, query, setQuery} = useFetch(url, {selector: (resp) => resp.data, defaultValue: {}, deps: []})
   * ```
   */
  function useFetch<T>(url: Routes, props: FetchProps<T>): UseFetch<T>;

  interface HookProviderProps {
    client: import("axios").AxiosInstance;
    children?: import("react").ReactNode;
  }

  /**
   * @name HookProvider
   * @param props {HookProviderProps} - Axios Instance
   * @description Axios
   * @example <caption>Example HookProvider </caption>
   * ```
   * const api = axios.create({
        baseURL: 'http://localhost/api',
        timeout: 45000,
        withCredentials: true,
      });
   
      <HookProvider client={api}>
        <App/>
      </HookProvider>
   * ```
   */
  function HookProvider(props?: HookProviderProps): JSX.Element;

  /**
   * @name useClient
   * @description Client
   * @example <caption>Example useClient </caption>
   * ```
   *   const api = useClient();
   *    api.get('/').then(resp => resp).catch(err => console.err(err))
   * ```
   */
  function useClient(): import("axios").AxiosInstance;

  type InputRegister = {
    value?: (
      event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => any;
  };
  interface UseMutationProps<T> {
    defaultValue: T;
    /**
     * @name schema
     *
     * [Yup Detail](https://www.npmjs.com/package/yup)
     */
    schema?: (yup: typeof import("yup")) => yup.AnyObjectSchema;
    isNewRecord?: (data: T) => boolean;
    validation?: {
      attributes?: {
        [P in keyof T]?: {
          solo?: boolean;
          on?: (data: T) => boolean;
        };
      };
    };
    format?: {
      [P in keyof T]?: (value: T[P]) => T[P];
    };
  }

  type SetDataProps<T> = {
    [P in keyof T]?: T[P];
  };

  type SetErrorProps<T> = {
    [P in keyof T]?: T[P];
  };

  type MutationMutationPostProps<T> = {
    options?: import("axios").AxiosRequestConfig;
    validation?:
      | boolean
      | {
          schema: (yup: typeof import("yup")) => yup.AnyObjectSchema;
          bag: string;
        };
    server?: any;
    useEmpty?: boolean;
    onBeforeSend?: () => void;
    onSuccess?: (
      data: { data: T },
      resp: Omit<import("axios").AxiosResponse, "data">
    ) => void;
    onError?: (e: AxiosError<any>) => void;
    onAlways?: () => void;
  };

  type MutationPutProps<T> = MutationPostProps<T>;

  type MutationGetProps<T> = Omit<
    MutationPostProps<T>,
    "validation" | "server"
  >;

  type MutationDestroyProps<T> = Omit<
    MutationPostProps<T>,
    "validation" | "server"
  >;

  type UseMutation<T> = {
    /**
     * @name loading
     * @description get loading status
     */
    loading: boolean;
    /**
     * @name processing
     * @description get process status
     */
    processing: boolean;
    data: T;
    /**
     * @name errors
     * @description get all errors value
     */
    errors: {
      [P in keyof T]?: string;
    };
    /**
     * @name isNewRecord
     * @description get action is update
     * @example <caption>Example usage of is update </caption>
     * mutation.isNewRecord ? put() : post()
     */
    isNewRecord: boolean;
    /**
     * @name SetData
     * @description set error from outside
     * @param {Setexport DataProps<T>} values - set value
     * @example <caption>Example usage of set value </caption>
     * mutation.seValue({key: "value"})
     */
    setData: (value: SetDataProps<T>) => void;
    /**
     * @name SetError
     * @description set error from outside
     * @param {{[P in keyof T]?: string}} values - set value error
     * @example <caption>Example usage of set error </caption>
     * mutation.setError({key: "key is required"})
     */
    setError: (values: { [P in keyof T]?: string }) => void;
    /**
     * @name Reformat
     * @description reformat data before send action
     * @example <caption>Example usage of reformat </caption>
     * mutation.reformat(data => ({...data}))
     */
    reformat: (cb: (value: T) => T) => void;
    /**
     * @name validate
     * @description validate data single
     * @example <caption>Example usage of validate </caption>
     *  <input onBlur={() => mutation.validate('key')} />
     */
    validate: (key: keyof T) => Promise<boolean>;
    post: <F = UseMutation<T>["data"]>(
      url: string | [url: string, arg?: { [key: string]: any }],
      option: MutationPostProps<F>
    ) => Promise<void>;
    put: <F = UseMutation<T>["data"]>(
      url: string | [url: string, arg?: { [key: string]: any }],
      option: MutationPostProps<F>
    ) => Promise<void>;
    destroy: <F = T>(
      url: string | [url: string, arg?: { [key: string]: any }],
      option: MutationDestroyProps<F>
    ) => Promise<void>;
    get: <F = T>(
      url: string | [url: string, arg?: { [key: string]: any }],
      option: MutationPostProps<F>
    ) => Promise<void>;
    /**
     * @name ClearData
     * @description clear data
     * @param {(keyof T)[]} except - ignore key
     * @example <caption>Example usage of clear data</caption>
     *  mutation.clearData() || mutation.clearData(["key"])
     */
    clearData: (except?: [keyof T]) => void;
    /**
     * @name ClearError
     * @description clear error validation
     * @example <caption>Example usage of clear error validation</caption>
     * mutation.clearError()
     */
    clearError: () => void;
    /**
     * @name CheckError
     * @description check error by key
     * @param {keyof T} key - keyof T
     * @example <caption>Example usage of check error by key</caption>
     *  mutation.error("key")
     * @returns {boolean} true or false
     */
    error: (key: keyof T) => boolean;
    /**
     * @name Message
     * @description get message error by key
     * @example <caption>Example usage of get error message by key</caption>
     *  mutation.message("key")
     * @returns {string} `"error message"`
     */
    message: (key: keyof T) => string;
    /**
     * @name ValidationCheck
     * @description get validation value
     * @example <caption>Example usage of check validation</caption>
     *  mutation.isValid()
     * @returns {boolean} `true or false`
     */
    isValid: () => boolean;
    /**
     * @name Abort
     * @description abort axios
     * @example <caption>Example usage of abort axios</caption>
     *  mutation.cancel()
     */
    cancel: () => void;
    /**
     * @name Register
     * @description simple set props TextField to set or get value
     * @param {keyof T} key - Key of T
     * @param {any} defautValue - default value
     * @param {InputRegister} options - default undefined
     * @example <caption>Example usage of register Input Element</caption>
     * ```
     * <input {...register("key")} />
     * ```
     */
    register: (
      key: keyof T,
      defaultValue?: any,
      options?: InputRegister
    ) => React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >;
    merge: (values: any) => void;
  };

  /**
   * @name useMutation
   * @description mutation
   * @param {UseMutationProps<T>} props
   * ```
   *  `Example`
   *  const mutation = useMutation({
        defaultValue: {
          id: 0,
          name: '',
          email: ''
        },
        schema: (yup) =>
          yup.object().shape({
            name: yup.string().required(),
            email: yup.string().required(),
          }),
        isNewRecord: (data) => data.id === 0,
        validation: {
          attributes: {
            name: {
              solo: true
            }
          },
        },
      });

      <input type='text' {...register('name')} />
      
      <input type='email' name="email" value={mutation.data.email} onChange={e => mutation.setData({email: e.target.value})} onBlur={() => mutation.validate('key')} />
      
      {mutation.error('email') && mutation.message('email')}
      
      mutation.post('/user', {
        onBeforeSend: () => {
          console.log('do before send')
        },
        onSuccess: (data, jhx) => {
          console.log('do success')
        },
        onError: (error) => {
          console.log('do error')
        },
        onAlways: () => {
          console.log('do always')
        }
      })
   * ```
   */
  function useMutation<T>(props: UseMutationProps<T>): UseMutation<T>;
}
