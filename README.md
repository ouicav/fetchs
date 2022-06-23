## fetchs介绍

- 简介：基于 `Fetch API` 实现的前端网络请求库


- 轻便的大小： `7kb` 
- 功能：单独的网络请求、统一参数的网络请求、请求拦截器、响应拦截器...
- 实现原理机制：发起请求时 `fetchs` 会接收调用 `fetchs()` 时的实参，在 `fetchs` 中，接收这些参数，每个参数都有一个不同的函数去处理，当参数处理完成后，才会生成一个 `Request` 实列对象， `fetch` 执行时，传入这个 `Request` 实列对象，真正的发起请求。请求任务完成后，在 `then()` 中接收一个 `Response`  对象，这个对象描述了响应回来的数据，经过一些处理后 `Response`  对象中响应数据体最终成为 `Promise`  实列对象，并抛出由 `fetchs()` 返回。
- 需要 `try/catch` 与 `async/await` 配合 `fetchs` 使用。
- 浏览器支持情况：在使用前请确保你的浏览器能够支持 `Fetch API` ，详见：https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch

## fetchs使用步骤一：导入

- **导入方式一：在HTML页面中导入**

  - 先下载 `fetchs.min.js`

  - 在HTML页面中导入 `fetchs` ，进行一个简单的请求。

     ```html
     <!DOCTYPE html>
     <html lang="en">
       <head>
         <meta charset="UTF-8" />
         <meta http-equiv="X-UA-Compatible" content="IE=edge" />
         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
         <script type="module">
           // 1 导入 fetchs
           import fetchs from './fetchs.min.js'
     
           // 2 使用 fetchs 进行一个简单的请求
           try {
             // 2.1 发起get请求
             const uu = await fetchs({
               url: `http://jsonplaceholder.typicode.com/comments`
             })
             // 2.2 请求成功则打印响应数据
             console.log(uu)
           } catch (err) {
             // 2.3 请求失败的处理操作
           }
         </script>
         <title>Document</title>
       </head>
       <body></body>
     </html>
     ```

- **导入方式二：在项目中导入**

  - 先下载`fetchs.min.js`

  - 在项目中导入 `fetchs`，进行一个简单的请求。

     ```javascript
     // 1 导入 fetchs
     import fetchs from './fetchs.min.js'
     
     // 2 使用 fetchs 进行一个简单的请求
     try {
       // 2.1 发起get请求
       const uu = await fetchs({
         url: `http://jsonplaceholder.typicode.com/comments`
       })
       // 2.2 请求成功则打印响应数据
       console.log(uu)
     } catch (err) {
       // 2.3 请求失败的处理操作
     }
     ```

- **导入方式三：依赖包导入**
  
  - 安装依赖
  
    ```
    npm i fetchs --save
    ```
  
  - 在项目中导入依赖，进行一个简单的请求
  
    ```js
    // 1 导入 fetchs
    import fetchs from 'fetchs'
    
    // 2 使用 fetchs 进行一个简单的请求
    try {
      // 2.1 发起get请求
      const uu = await fetchs({
        url: `http://jsonplaceholder.typicode.com/comments`
      })
      // 2.2 请求成功则打印响应数据
      console.log(uu)
    } catch (err) {
      // 2.3 请求失败的处理操作
    }
    ```

## fetchs使用步骤二：请求的两种使用方式 

- **fetchs的使用有两种方式**

  - 单独的请求

    ```javascript
      // 1 导入 fetchs
      import fetchs from './fetchs.min.js'
      
      // 2 使用 fetchs 进行一个简单的请求
      try {
        const uu = await fetchs({
          url: `http://jsonplaceholder.typicode.com/comments`
        })
        // 2.2 请求成功则打印响应数据
        console.log(uu)
      } catch (err) {
        // 2.3 请求失败的处理操作
      }
    ```

  - 统一参数的请求

    ```javascript
       // 1 导入 fetchs
            import fetchs from './fetchs.min.js'
      
            // 2 设置 baseUrl地址
            const ff = fetchs({ baseUrl: 'http://jsonplaceholder.typicode.com/' })
      
            // 3 使用 fetchs 进行一个简单的请求
            try {
              const uu = await ff({
                url: `posts/2`
              })
              // 3.1 请求成功则打印响应数据
              console.log(uu)
            } catch (err) {
              // 3.2 请求失败的处理操作
            }
    ```

  - 两种使用方式互不干扰，可在同个页面中交叉使用。

## fetchs使用步骤三：配置对象

- **什么是配置对象？**

  - `fetchs` 的配置对象就是当前的请求参数的集合，根据设置不同的请求参数发起请求时， `fetchs` 自动把这些参数传入到生成的 `Request` 实列对象中，从而实现不同的网络请求类型。

  - 下面的请求中，配置对象就有一个基本的请求参数： `url参数` 

    ```javascript
     const uu = await fetchs({
        url: `http://jsonplaceholder.typicode.com/comments`
      })
    ```

- **单独的请求的配置对象**

  - `url参数` 是必填的，其他`参数`可以根据接口要求去配置，可有可无。
  - 如果 `body参数` 的值是一个`object` 数据类型，那么发送请求时 `fetchs` 会自动把这个对象转化为 `json数据格式` 发送。
  - 发送 `body参数` 的请求体时，浏览器会根据请求体的数据类型，自动配置相应的请求头(headers)。
  - 设置 `time参数` 后，发送请求时，如果服务器没有在设定的时间内有响应，那么 `fetchs` 会自动取消这次请求，并抛出错误信息由 `try/catch` 语句中的 `catch块 `的错误对象 `err` 接收。
  - 参数顺序没有固定
  - 如果不配置 `format参数` ，当请求成功响应后，那么 `fetchs` 会自动把成功响应回来的数据当作 `json格式` 以反序列化的形式转化数据，如果转化失败，那么会把响应数据当作 `xml` ，`srting`，`json` 等字符格式的数据类型转化成text数据格式, 如果还是转化失败，则抛出错误。
  - `query参数` ，`time参数` ，`format参数` ，`progress参数 ` 这四个参数功能都是独立封装的，并不在`Request` 实列对象的支持中.
  - 参数配置

  | 参数           | 说明                                           | 值的数据类型                                                 | 默认值                     |
  | -------------- | ---------------------------------------------- | ------------------------------------------------------------ | -------------------------- |
  | url            | 请求的接口地址                                 | `string`                                                     | 否                         |
  | method         | 用于指定HTTP请求的方法                         | `string`                                                     | GET                        |
  | body           | 指定请求体的内容                               | `Blob`  `BufferSource`  `FormData` `String`  `URLSearchParams`  `ReadableStream` | 否                         |
  | query          | 配置查询参数                                   | `object`                                                     | 否                         |
  | params         | 配置路径参数                                   | `array`                                                      | 否                         |
  | headers        | 用于指定请求头                                 | `object`                                                     | 否                         |
  | time           | 配置超时时间                                   | `number`                                                     | 否                         |
  | format         | 配置转化响应体的数据类型或格式                 | `string`                                                     | json                       |
  | progress       | 用于下载进度和获取Uin8Array数据块              | `boolean`                                                    | 否                         |
  | cache          | 用户控制浏览器与HTTP缓存的交互                 | `string`                                                     | default                    |
  | credentials    | 用于指定在请求中如何包含cookie                 | `string`                                                     | same-origin                |
  | integrity      | 用于强制子资源完整性                           | `string`                                                     | ''                         |
  | keepalive      | 用于指定浏览器允许请求存在时间超出页面生命周期 | `boolean`                                                    | false                      |
  | mode           | 用于指定请求模式                               | `string`                                                     | cors                       |
  | redirect       | 用于指定如何处理重定向响应                     | `string`                                                     | follow                     |
  | referrer       | 用于指定HTTP得referer头部内容                  | `string`                                                     | client/about:client        |
  | referrerPolicy | 用于指定HTTP的referer头部                      | `string`                                                     | no-referrer-when-downgrade |

  - 更详细的参数说明请参考：https://developer.mozilla.org/zh-CN/docs/Web/API/Request

- **统一参数请求的配置对象**

  - 所有的 `参数` 都不是必须的

  - 除了 `baseUrl参数` 与 `单独的请求的配置对象` 的 `url参数` 不一样，其他 `参数` 功能都是一样。

  - 如果统一参数请求的配置对象 `参数` 与绑定的单独请求配置对象 `参数` 一样，但是值不一样，则绑定的单独请求配置对象 `参数` 优先生效，请看下面的代码。

     ```javascript
     // 1 导入 fetchs
     import fetchs from './fetchs.min.js'
     
     // 2 设置 baseUrl地址
     const ff = fetchs({
       baseUrl: 'http://jsonplaceholder.typicode.com/',
       // 设置超时时间，发送请求时，检查到绑定的单独请求配置对象也有time参数，所以这里的优先级最低，不生效。
       time: 6000
     })
     
     // 3 使用 fetchs 进行一个简单的请求
     try {
       const uu = await ff({
         url: `posts/2`,
         // 设置超时时间,这里的优先级最高，优先生效。
         time: 4000
       })
       // 3.1 请求成功则打印响应数据
       console.log(uu)
     } catch (err) {
       // 3.2 请求失败的处理操作
     }
     ```

  - 参数配置

  | 参数           | 说明                                           | 值的数据类型                                                 | 默认值                     |
  | -------------- | ---------------------------------------------- | ------------------------------------------------------------ | -------------------------- |
  | baseUrl        | 统一接口开头地址与单独请求地址拼接             | `string`                                                     | 否                         |
  | method         | 用于指定HTTP请求的方法                         | `string`                                                     | GET                        |
  | body           | 指定请求体的内容                               | `Blob`  `BufferSource`  `FormData` `String`  `URLSearchParams`  `ReadableStream` | 否                         |
  | query          | 配置查询参数                                   | `object`                                                     | 否                         |
  | params         | 配置路径参数                                   | `array`                                                      | 否                         |
  | headers        | 用于指定请求头                                 | `object`                                                     | 否                         |
  | time           | 配置超时时间                                   | `number`                                                     | 否                         |
  | format         | 配置转化响应体的数据类型或格式                 | `string`                                                     | json                       |
  | progress       | 用于下载进度和获取Uin8Array数据块              | `boolean`                                                    | 否                         |
  | cache          | 用户控制浏览器与HTTP缓存的交互                 | `string`                                                     | default                    |
  | credentials    | 用于指定在请求中如何包含cookie                 | `string`                                                     | same-origin                |
  | integrity      | 用于强制子资源完整性                           | `string`                                                     | ''                         |
  | keepalive      | 用于指定浏览器允许请求存在时间超出页面生命周期 | `boolean`                                                    | false                      |
  | mode           | 用于指定请求模式                               | `string`                                                     | cors                       |
  | redirect       | 用于指定如何处理重定向响应                     | `string`                                                     | follow                     |
  | referrer       | 用于指定HTTP得referer头部内容                  | `string`                                                     | client/about:client        |
  | referrerPolicy | 用于指定HTTP的referer头部                      | `string`                                                     | no-referrer-when-downgrade |

## fetchs使用步骤四：请求拦截器

- 在请求拦截器中，你可以在请求前处理请求的配置对象 `data`

- 在请求拦截器中，你可以在请求前使用 `fetchs` 另外一个单独请求或多个单独请求...

- 示列代码

  ```html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <script type="module">
        // 1 导入 fetchs
        import fetchs from './fetchs.min.js'
  
        // 2 设置 baseUrl地址
        const ff = fetchs({
          baseUrl: 'http://jsonplaceholder.typicode.com/',
          time: 7000
        })
  
        // 2.1 请求拦截器
        ff.byIntercepting = async (data) => {
          // 2.2 data参数为必须有的
          // 2.3 data参数当前请求的配置对象在这里可以打印出来
          if (data.time) {
            console.log(data)
          }
          // 2.4 body的参数在这里也是可以修改的，注意变量提升。
          data.time = 5000
          console.log(data)
  
          // 2.5 进行单独请求
          try {
            const bb = await fetchs({
              url: `http://jsonplaceholder.typicode.com/posts/2`
            })
            // 2.6 输出单独请求响应数据
            console.log(bb)
          } catch (err) {}
  
          // 2.7 最后不要忘记了要return 出 配置对象
          return data
        }
  
        // 3 使用 fetchs 进行一个简单的请求
        try {
          const uu = await ff({
            url: `posts/2`
          })
          // 3.1 请求成功则打印响应数据
          console.log(uu)
        } catch (err) {
          // 3.2 请求失败的处理操作
        }
      </script>
      <title>Document</title>
    </head>
    <body></body>
  </html>
  ```


## fetchs使用步骤五：响应成功拦截器

- 设置了响应成功拦截器只有在当前请求的响应状态码 `(200~299)之间` 会触发。

- 在响应成功拦截器中，你可以获取到响应成功的数据参数对象 `data`，对响应体进行处理。

  | data参数   | 说明                                                         |
  | ---------- | ------------------------------------------------------------ |
  | body       | 已自动转化的响应体数据                                       |
  | bodys      | 未转化的响应体数据，未读取的响应体数据。                     |
  | headers    | 响应的headers对象                                            |
  | ok         | 布尔值，表示HTTP状态码的含义。200~299的状态码返回true,其他状态码返回false。 |
  | redirected | 布尔值，表示响应是至少经过一次重定向                         |
  | status     | 整数，表示响应的HTTP状态码                                   |
  | statusText | 字符串，包含对HTTP状态码的正式描述。                         |
  | type       | 表示响应类型                                                 |
  | url        | 当前请求的接口地址                                           |

- 更详细的参数说明请参考：https://developer.mozilla.org/zh-CN/docs/Web/API/Response

- 在响应成功拦截器中，你可以在请求前使用`fetchs`另外一个单独请求或多个单独请求。

- 在响应成功拦截器中，你可以重复发送本次请求...

- 示列代码

  ```html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <script type="module">
        // 1 导入 fetchs
        import fetchs from './fetchs.min.js'
  
        // 2 设置 baseUrl地址
        const ff = fetchs({
          baseUrl: 'http://jsonplaceholder.typicode.com/',
          time: 7000
        })
  
        // 2.1 响应成功拦截器
        ff.dataBoolean = async (data) => {
          // 2.2 进行单独请求
          try {
            const bb = await fetchs({
              url: `http://jsonplaceholder.typicode.com/posts/2`
            })
            console.log('响应成功拦截器单独请求')
            console.log(bb)
          } catch (err) {}
  
          // 2.3 重复本次成功请求
          try {
            const cc = await fetchs.repetition()
            console.log('重复本次成功请求')
            console.log(cc)
          } catch (err) {}
  
          // 2.4 获取到当前请求成功的响应数据体
          console.log(data.body)
  
          // 2.5 修改当前请求成功的响应数据体
          data.body = '3444'
  
          // 2.6 最后不要忘记了要return 出 配置对象
          return data
        }
  
        // 3 使用 fetchs 进行一个简单的请求
        try {
          const uu = await ff({
            url: `posts/2`
          })
  
          // 3.1 请求成功则打印响应数据
          console.log(uu)
        } catch (err) {
          // 3.2 请求失败的处理操作
        }
      </script>
      <title>Document</title>
    </head>
    <body></body>
  </html>
  ```

## fetchs使用步骤六：响应失败拦截器

- 设置了响应失败拦截器只有在当前请求的响应状态码 `(200~299)之外` 会触发。

- 在响应失败拦截器中，你可以获取到响应失败的数据参数对象 `data` ，对响应体进行处理。

- 参数对象 `data` 的属性与响应成功的参数对象 `data` 完全一致。

  | body       | 已自动转化的响应体数据                                       |
  | ---------- | ------------------------------------------------------------ |
  | bodys      | 未转化的响应体数据，未读取的响应体数据。                     |
  | headers    | 响应的headers对象                                            |
  | ok         | 布尔值，表示HTTP状态码的含义。200~299的状态码返回true,其他状态码返回false。 |
  | redirected | 布尔值，表示响应是至少经过一次重定向                         |
  | status     | 整数，表示响应的HTTP状态码                                   |
  | statusText | 字符串，包含对HTTP状态码的正式描述。                         |
  | type       | 表示响应类型                                                 |
  | url        | 当前请求的接口地址                                           |
  | data参数   | 说明                                                         |

- 在响应失败拦截器中，你可以在请求前使用 `fetchs` 另外一个单独请求或多个单独请求。

- 在响应失败拦截器中，你可以重复发送本次请求...

- 示列代码

  ```html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <script type="module">
        // 1 导入 fetchs
        import fetchs from './fetchs.min.js'
  
        // 2 设置 baseUrl地址
        const ff = fetchs({
          baseUrl: 'http://jsonplaceholder.typicode.com/',
          time: 7000
        })
  
        // 2.1 响应失败拦截器
        ff.failureResponse = async (data) => {
          // 2.2 进行单独请求
          try {
            const bb = await fetchs({
              url: `http://jsonplaceholder.typicode.com/posts/2`
            })
            console.log('响应成功拦截器单独请求')
            console.log(bb)
          } catch (err) {}
  
          // 2.3 重复本次失败请求
          try {
            const cc = await fetchs.repetition()
  
            console.log(cc)
          } catch (err) {
            console.log('重复本次失败请求')
            console.log(err)
          }
  
          // 2.4 获取到当前请求失败的响应数据体
          console.log(data.body)
  
          // 2.5 修改当前请求失败的响应数据体
          data.body = '3444'
  
          return data
        }
  
        // 3 使用 fetchs 进行一个简单的请求
        try {
          const uu = await ff({
            url: `post`
          })
        } catch (err) {
          // 3.2 请求失败的处理操作
          // 3.3 打印出失败的响应参数对象
          console.log(err)
        }
      </script>
      <title>Document</title>
    </head>
    <body></body>
  </html>
  ```

## fetchs使用步骤七：取消请求

- 取消当前最新的网络请求。

  ```html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <script type="module">
        // 1 导入 fetchs
        import fetchs from './fetchs.min.js'
  
        // 2 设置 baseUrl地址
        const ff = fetchs({
          baseUrl: 'http://jsonplaceholder.typicode.com/',
          time: 7000
        })
  
        // 同时发送多个请求
        const uu = ff({ url: `posts/2` })
        const dd = fetchs({ url: 'http://jsonplaceholder.typicode.com/posts/2' })
  
        // 中断当前最新的网络请求
        fetchs.breakRequest()
      </script>
      <title>Document</title>
    </head>
    <body></body>
  </html>
  ```

- 取消指定的网络请求

  - 在每个请求中，`fetchs()` 第一个回调函数是用于中断网络请求操作的，当发起请求或设置了超时时间开启定时器后就会调用这个回调函数。

  ```html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <script type="module">
        // 1 导入 fetchs
        import fetchs from './fetchs.min.js'
  
        // 2 设置 baseUrl地址
        const ff = fetchs({
          baseUrl: 'http://jsonplaceholder.typicode.com/',
          time: 7000
        })
  
        // 4 当发起请求前的开始计时超时后，都会调用一个回调函数。
        const nn = () => {
          // 中断设置该回调函数的请求
          fetchs.breakRequest()
        }
  
        // 3 使用 fetchs 进行一个简单的请求
        try {
          const uu = await ff(
            {
              url: `posts/2`
            },
            nn
          )
          console.log(uu)
        } catch (err) {
          // 3.2 请求失败的处理操作
        }
      </script>
      <title>Document</title>
    </head>
    <body></body>
  </html>
  ```

- 同时取消多个指定的网络请求

  ```html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <script type="module">
        // 1 导入 fetchs
        import fetchs from './fetchs.min.js'
  
        // 2 设置 baseUrl地址
        const ff = fetchs({
          baseUrl: 'http://jsonplaceholder.typicode.com/',
          time: 7000
        })
  
        // 4 当发起请求前的开始计时超时后，都会调用一个回调函数。
        const nn = () => {
          // 中断设置该回调函数的请求
          fetchs.breakRequest()
        }
  
        // 同时发送多个请求
        const uu = ff({ url: `posts/2` }, nn)
        const dd = fetchs({ url: 'http://jsonplaceholder.typicode.com/posts/2' }, nn)
      </script>
      <title>Document</title>
    </head>
    <body></body>
  </html>
  ```

## fetchs使用步骤八：并发处理多个异步请求

- 同时发送多个请求，并且所有的网络请求任务完成才能处理。

  ```html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <script type="module">
        // 1 导入 fetchs
        import fetchs from './fetchs.min.js'
  
        // 2 设置 baseUrl地址
        const ff = fetchs({
          baseUrl: 'http://jsonplaceholder.typicode.com/'
        })
  
        // 3 同时发送多个请求
        const uu = ff({ url: `posts/2` })
        const dd = fetchs({ url: 'http://jsonplaceholder.typicode.com/posts/2' })
        Promise.all([uu, dd]).then((result) => {
          // 所有的异步请求任务完成后才会执行这里的任务
          // result的输出结果为一个数组，成员为这些异步请求的响应数据体。
          // 响应数据体包括成功响应(状态码200~299之间)和失败响应(200~299之外)
          // 输入的结果成员顺序按照自己设定的[uu, dd]顺序来
          console.log(result)
        })
      </script>
      <title>Document</title>
    </head>
    <body></body>
  </html>
  ```

- 同时发送多个请求，主要有一个异步请求任务完成才能处理。

  ```html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <script type="module">
        // 1 导入 fetchs
        import fetchs from './fetchs.min.js'
  
        // 2 设置 baseUrl地址
        const ff = fetchs({
          baseUrl: 'http://jsonplaceholder.typicode.com/'
        })
  
        // 3 同时发送多个请求
        const uu = ff({ url: `posts/2` })
        const dd = fetchs({ url: 'http://jsonplaceholder.typicode.com/posts/2' })
        Promise.race([uu, dd]).then((result) => {
          // result只会返回最先完成的异步请求任务的响应数据体
          // 响应数据体包括成功响应(状态码200~299之间)和失败响应(200~299之外)
          console.log(result)
        })
      </script>
      <title>Document</title>
    </head>
    <body></body>
  </html>
  ```

## fetchs使用步骤九：实现下载进度和获取Uin8Array数据块

- 数据传输时遵循TCP/IP协议，传输的数据是以分块( `Uin8Array数据块` )形式抵达端点的，而且速度受到网速的限制。接收端点会为此分配内存，并将收到的块写入内存。`Fetch API` 通过`ReadableStream`支持在这些块到达时就实时读取和操作这些数据。

- `fetchs` 把这些操作都封装了，当你在请求的配置对象中，请求配置对象设置了 `progress参数` 为 `true` 那么就会自动开启以分块( `Uin8Array数据块` )传输。

- `fetchs()` 接收第二个回调函数，第一个回调函数是处理中断请求的。

- 在这第二个函数中，每次接收到 `Uin8Array数据块` 就会自动触发这个函数，传递三个实参，分别是：

  - `Uin8Array数据块`
  -  `Uin8Array数据块大小`  
  - 当前传输的百分比进度

- 想要实现下载进度，必须确保`Response` 实列对象中的 `headers` 有 `Content-Length` 且值不为0, 否则 传输的百分比进度参数值为 `null`。

- 代码示列

  ```html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <script type="module">
        // 1 导入 fetchs
        import fetchs from './fetchs.min.js'
  
        // 3 实现下载进度和获取Uin8Array数据块
        const ff = (value, magnitude, proportion) => {
          // 输出传输进度，响应头没有Content-Length则为null
          console.log(proportion)
  
          // 输出当前块大小
          console.log(magnitude)
  
          // 输出Uin8Array数据块
          console.log(value)
  
          // 将Uin8Array数据块转化为text数据格式
          let decoder = new TextDecoder()
          const tt = decoder.decode(value, { stream: true })
          console.log(tt)
        }
  
        // 2 发起请求
        try {
          const uu = await fetchs({ url: 'http://jsonplaceholder.typicode.com/photos', progress: true, format: 'text' }, null, ff)
          console.log(uu)
        } catch (err) {}
      </script>
      <title>Document</title>
    </head>
    <body>
      <div></div>
    </body>
  </html>
  ```

## fetchs使用步骤十：请求出错的信息处理

- 首先要确保你的配置对象参数正确

- `fetchs` 默认遵循 `CORS协议` 的跨域请求

- `get` 请求不能携带 `body` 请求体

- 正常的响应成功后也就是响应状态码在 `200~299之间` 的会在 `try` 中抛出格式化后的`响应数据体`

- 正常的失败后，也就是服务器接收到了，有响应但是状态码为 `200~299以外` 的会在 `catch` 抛出失败的响应数据。

- 示列代码

  ```html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <script type="module">
        // 1 导入 fetchs
        import fetchs from './fetchs.min.js'
  
        // 2 使用 fetchs 进行一个简单的请求
        try {
          // 2.1 发起get请求
          const uu = await fetchs({
            url: `http://jsonplaceholder.typicode.com/comments`
          })
          // 2.2 请求成功则打印响应数据
          console.log(uu)
        } catch (err) {
          // 2.3 请求失败的处理操作
          // 2.4 err相当于为请求失败的Response对象
          // 2.5 可通过err.status识别响应失败的状态码
          console.log(err.status)
          // 2.6 当出现其他无法预估的错误时，比如：手动取消，接口无效，服务器接收到了没有设置响应，服务器拒绝响应，其他未知原因，
          // 2.7 当出现以上情况后，此时的err就不是Response对象了，而是null。
        }
      </script>
      <title>Document</title>
    </head>
    <body></body>
  </html>
  ```

  

