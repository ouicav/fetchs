const fetchs = (obj, interrupt, progress) => {
  // 设置超时函数
  const abortController = new AbortController();

  // 封装处理请求超时函数
  const requestTime = (time, interrupt, abortController) => {
    if (time) {
      // 设置发起请求之后多久中断网络请求
      fetchs.setTime = setTimeout((time) => {
        abortController.abort();
      }, time);
    }

    // 封装手动取消当前请求函数
    fetchs.breakRequest = () => {
      if (time) {
        clearTimeout(fetchs.setTime);
      }
      abortController.abort();
    };

    // 定时器开始之后封装回调函数
    if (interrupt) {
      interrupt();
    }
  };

  // 封装处理请求方式函数
  const requestWay = (obj) => {
    // 开始判断是否有设置请求方式，如果没有则默认设置为get请求
    if (!obj.method) {
      obj.method = "get";
    }
    return obj;
  };

  // 封装处理路径参数函数
  const paramsFunction = (obj) => {
    // 判断是否有路径参数
    if (obj.params) {
      // 开始遍历obj.params放到请求地址路径中
      // 开始遍历obj.params
      obj.params.forEach((value, index, array) => {
        // forEach 方法遍历数组
        // value为当前元素，index为当前元素索引号，arra代表这个数组本身
        obj.url = obj.url + "/" + value;
      });
    }
    return obj;
  };

  // 封装处理查询参数函数
  const queryParameters = (obj) => {
    // 判断是否有查询参数
    if (obj.query) {
      // 开始遍历obj.query放到请求地址路径中
      let sun = 0;
      for (var k in obj.query) {
        // 识别第一个查询参数
        if (sun === 0) {
          obj.url = obj.url + "?" + k + "=" + obj.query[k];
          sun += 1;
        } else {
          // 识别剩下的查询参数
          obj.url = obj.url + "&" + k + "=" + obj.query[k];
        }
      }
    }
    return obj;
  };

  // 封装请求体函数
  const requestBody = (bodys) => {
    // 请求体符合json六种数据格式的自动转化成json
    // 不符合的直接发送原始数据
    // body数值必须是一个对象
    // 转化成json格式可以是数字、字符串、布尔值、null、数组、对象6种数据类型

    if (bodys) {
      // 这里要判断请求体是纯对象格式,如果是对象格式那么就自动转化成json格式。
      if (
        bodys.__proto__.constructor.name === "Object" &&
        !bodys.__proto__.get
      ) {
        let body = JSON.stringify(bodys);
        return body;
      }
      // 请求体携带的格式只能是：Blob或BufferSource或FormData或URLSearchParams.ReadableStream或String的实列对象
      return bodys;
    } else {
      return bodys;
    }
  };

  // 封装请求模式函数
  const modes = (mode) => {
    if (mode) {
      return mode;
    } else {
      return "cors";
    }
  };
  // 封装控制浏览器与HTTP缓存的交互函数
  const caches = (cache) => {
    if (cache) {
      return cache;
    } else {
      return "default";
    }
  };

  // 封装用于指定在外请求中如何包含coolie函数
  const credentiaiss = (credentiais) => {
    if (credentiais) {
      return credentiais;
    } else {
      return "same-origin";
    }
  };

  // 封装用于强制字资源完整性函数
  const integritys = (integrity) => {
    if (integrity) {
      return integrity;
    } else {
      return "";
    }
  };

  // 封装用于指示浏览器允许请求存在时间超出页面生命周期
  const keepalives = (keepalive) => {
    if (keepalive) {
      return keepalive;
    } else {
      return false;
    }
  };

  // 封装用于指定如何处理重定向响应函数
  const redirects = (redirect) => {
    if (redirect) {
      return redirect;
    } else {
      return "follow";
    }
  };

  // 封装用于指定HTTP的Referer头部的内容函数
  const referrers = (referrer) => {
    if (referrer) {
      return referrer;
    } else {
      return "client/about:client";
    }
  };

  // 封装用于指定HTTP的Referer头部函数
  const referrerPolicys = (referrerPolicy) => {
    if (referrerPolicy) {
      return referrerPolicy;
    } else {
      return "no-referrer-when-downgrade";
    }
  };

  // 封装处理请求对象函数
  const reques = (obj, abortController, body) => {
    let request = {};
    // 请求方式都转化为小写
    obj.method = obj.method.toLowerCase();
    // 判断是否为get,且带了请求体则抛出错误。
    if (obj.method === "get" && body)
      return console.error("get请求不能携带请求体");
    // 判断如果是使用get请求方式或没有请求体得情况下使用没有请求体的请求对象
    if (obj.method === "get" || !body) {
      request = new Request(obj.url, {
        method: obj.method,
        signal: abortController.signal,
        mode: `${modes(obj.mode)}`,
        cache: `${caches(obj.cache)}`,
        credentiais: `${credentiaiss(obj.credentiais)}`,
        integrity: `${integritys(obj.integrity)}`,
        keepalive: `${keepalives(obj.keepalive)}`,
        redirect: `${redirects(obj.redirect)}`,
        referrer: `${referrers(obj.referrer)}`,
        referrerPolicy: `${referrerPolicys(obj.referrerPolicy)}`,
      });
      // 判断如果没有使用get请求方式，有使用请求体情况下
    } else if (obj.method !== "get" && body) {
      request = new Request(obj.url, {
        method: obj.method,
        signal: abortController.signal,
        body: body,
        mode: `${modes(obj.mode)}`,
        cache: `${caches(obj.cache)}`,
        credentiais: `${credentiaiss(obj.credentiais)}`,
        integrity: `${integritys(obj.integrity)}`,
        keepalive: `${keepalives(obj.keepalive)}`,
        redirect: `${redirects(obj.redirect)}`,
        referrer: `${referrers(obj.referrer)}`,
        referrerPolicy: `${referrerPolicys(obj.referrerPolicy)}`,
      });
    }
    return request;
  };

  // 封装处理请求头函数
  const header = (request, obj) => {
    // 有请求体则根据请求体发送相关请求头,值是字符串的浏览器自动配置请求头Content-Type: text/plain;charset=UTF-8
    // 如果值是对象的，浏览器自动配置请求头Content-Type: text/plain;charset=UTF-8
    // 如果值是Formdata的，浏览器自动配置请求头Content-Type: multipart/form-data; boundary=----WebKitFormBoundarylcBlRAYNeWOSiKsf
    // 如果请求体如果是纯对象格式则请求体函数会把对象转化为json数据类型，浏览器如果没有配置Content-Type就会自动把json数据类型识别为字符串，并配置请求头Content-Type: text/plain;charset=UTF-8,
    // 默认的我们会把对象转化成json，发送json时，需要配置请求头Content-Type: application/json
    if (obj.body) {
      if (
        obj.body.__proto__.constructor.name === "Object" &&
        !obj.body.__proto__.get
      ) {
        request.headers.set("Content-Type", "application/json");
      }
    }
    //  判断是否有配置请求头
    if (obj.header) {
      // 开始遍历
      for (var k in obj.header) {
        request.headers.set(k, obj.header[k]);
      }
    }
  };

  // 封装默认处理函数
  const theDefaultProcessing = (obj, abortController) => {
    // 请求方式
    requestWay(obj);
    // 路径参数
    paramsFunction(obj);
    // 查询参数
    queryParameters(obj);
    // 请求体
    const body = requestBody(obj.body);
    // 请求对象,get请求方式不允许放请求体
    const request = reques(obj, abortController, body);
    // 请求标头
    header(request, obj);
    return request;
  };

  // 封装请求拦截器
  const requestBefore = async (ob, obs) => {
    // 获取用户在请求拦截器的配置
    await obs.byIntercepting(ob);

    return ob;
  };

  // 封装成功响应拦截器
  const dataBooleans = async (datas, ob, obs) => {
    // 检查用户是否有设置成功响应拦截器
    if (obs.dataBoolean) {
      // 这里进行重复请求操作
      repetitions(ob);
      await obs.dataBoolean(datas);
    }
    return datas;
  };

  // 封装响应失败拦截器(状态码为200到299以外的自动触发失败拦截器)
  const failureResponses = async (datas, ob, obs) => {
    // 检查用户是否有设置响应失败拦截器
    if (obs.failureResponse) {
      // 这里进行重复请求操作
      repetitions(ob);
      // 调用响应失败函数
      await obs.failureResponse(datas);
    }
    return datas;
  };

  // 封装重复请求函数
  const repetitions = (ob) => {
    // 重复请求没有进度事件
    if (ob.progress) {
      delete ob.progress;
    }

    // 声明重复请求函数,fetchs 里面填应填ob，为这次中断的请求函数。
    fetchs.repetition = async () => {
      const interruptRequestResult = await fetchs(ob);
      // return出去能够接收到重复请求的结果
      return interruptRequestResult;
    };
  };

  // 封装fetch请求逻辑函数
  const requestFetch = (request, ob, obs, progress) => {
    return new Promise((resolve, reject) => {
      fetch(request).then(
        async (data) => {
          // 已经得到响应数据就取消超时定时器
          clearTimeout(fetchs.setTime);
          // 判断是否有设置进度事件和判断文件大小的响应头是否有，是否设置了进度回调函数。
          // && data.headers.has('Content-Length')

          if (ob.progress && progress) {
            const reader = data.clone().body.getReader();

            // 总大小
            let ff = 0;
            // 获取数据块时，先调用外面函数，告诉用户已经开始传输
            const secondaryStream = new ReadableStream({
              async start(controller) {
                try {
                  while (true) {
                    const { value, done } = await reader.read();
                    // 每次下载数据块占总大小的百分比
                    ff += value.length;
                    // 判断data.headers.get('Content-Length')是否有效
                    if (data.headers.get("Content-Length")) {
                      // 下载百分比

                      // data.headers.get("Content-Length")获取get值
                      const proportion =
                        (ff / data.headers.get("Content-Length")) * 100;
                      // 获取每个数据块的大小和数据块本身。
                      progress(value, value.length, proportion);
                    } else {
                      progress(value, value.length, null);
                    }

                    if (done) {
                      break;
                    }
                    // 将主体流的块推到第二个流
                    controller.enqueue(value);
                  }
                } finally {
                  controller.close();
                  reader.releaseLock();
                }
              },
            });
            data = new Response(secondaryStream);
          }
          // 根据data的ok属性判断是成功响应还是失败的响应
          // 200到299的状态码会返回true，其他状态码返回false
          // 注意响应回来数据需要缓存到内存中才能使用方法转换
          // 转换方法只能使用一次,但是在转换前添加clone()方法会创建出一个副本，可以无限使用。
          let body = null;
          // 开始判断配置项是否有转换数据格式的
          if (ob.format) {
            if (ob.format === "json") {
              try {
                body = await data.clone().json();
              } catch (err) {
                // 设置转化json格式失败则抛出错误
                console.error(
                  "无法反序列化json类型的响应数据，请检查响应数据类型是否符合json规则，或修改转化数据类型配置"
                );
              }
            } else if (ob.format === "text") {
              // 请求注意如果是json格式数据转化为text格式数据，保存在datas的时候会出现乱码，请规范使用。
              body = await data.clone().text();
            } else if (ob.format === "formdata") {
              // 反序列化主体
              body = await data.clone().formData();
            } else if (ob.format === "arraybuffer") {
              // 转化为原始二进制
              body = await data.clone().arrayBuffer();
            } else if (ob.format === "blob") {
              // 以原始二进制为主体，不用查看和修改。
              body = await data.clone().blob();
            }
          } else {
            // 默认自动识别json格式并抓换为数据类型,转化json失败自动转为text
            try {
              body = await data.clone().json();
            } catch (err) {
              try {
                body = await data.clone().text();
              } catch (err) {
                // 没有设置转换数据类型的，又转化json和text失败的则抛出错误
                console.error(
                  "响应数据不是json数据类型或字符串，转化失败，请修改转化数据类型配置。"
                );
              }
            }
          }

          // 转换数据
          let datas = {
            body: body,
          };

          for (var k in data) {
            // k为当前属性名
            // obj为对象
            // obj[k]为属性值
            if (k === "body") {
              datas["bodys"] = data[k];
            }
            if (
              k === "url" ||
              k === "type" ||
              k === "status" ||
              k === "ok" ||
              k === "headers" ||
              k === "redirected" ||
              k === "statusText"
            ) {
              datas[k] = data[k];
            }
          }

          // 下面抛出的都是服务器有响应的，状态码在200到299内会触发成功响应，200到299以外抛出失败错误。
          // 判断为默认请求情况下，处理成功响应拦截器和响应失败拦截器。
          if (data.ok && !obj.url) {
            // 这里是成功的响应处理程序，默认将响应回来的数据识别为json并转换为javascript数据类型的promise对象
            datas = await dataBooleans(datas, ob, obs);
            resolve(datas.body);
            // 状态码在200到299外，抛出错误。
          } else if (!data.ok && !obj.url) {
            datas = await failureResponses(datas, ob, obs);
            // 调用错误函数能够抛出错误，且被catch接收到抛出的错误响应数据。
            reject(datas);
          } else if (data.ok) {
            // 这里是单独请求拦截器
            resolve(datas.body);
          } else if (!data.ok) {
            reject(datas);
          }
        },
        (err) => {
          // 取消定时器
          clearTimeout(fetchs.setTime);
          // 直接抛出错误都是服务器没有响应回来的错误
          // 手动取消会触发这里，接口无效会触发这里，服务器接收到了没有设置响应会触发这里，服务器拒绝响应会触发这里，请求超时取消请求会触发这里，其他原因
          console.error(err);
          // 抛出错误
          reject(undefined);
        }
      );
    });
  };

  // 调用请求库时根据传入参数判断是直接请求还是配置默认地址请求
  if (!obj.url) {
    const obs = async (ob, interrupt, progress) => {
      // ob为用户配置的请求参数
      // 判断是否有默认请求地址,如果有则拼接默认地址
      if (obj.baseUrl) {
        ob.url = obj.baseUrl + ob.url;
      }

      // 判断是否有设置默认请求超时时间,如果有默认请求时间且用户配置项没有配置时间则取配置的请求超时时间
      if (obj.time && !ob.time) {
        ob.time = obj.time;
      }

      // 判断是否有设置默认请求方式,且用户没有配置请求方式，则取默认请求方式。
      if (obj.method && !ob.method) {
        ob.method = obj.method;
      }

      // 判断是否有设置默认路径参数,且用户没有配置路径参数，则取默认路径参数。
      if (obj.params && !ob.params) {
        ob.params = obj.params;
      }

      // 判断是否有设置默认查询参数,且用户没有配置查询参数，则取默认查询参数。
      if (obj.query && !ob.query) {
        ob.query = obj.query;
      }

      // 判断是否有设置默认请求体，且用户没有配置请求体,则取默认请求体。
      if (obj.body && !ob.body) {
        ob.body = obj.body;
      }

      // 判断是否有设置默认请求模式，且用户没有配置请求模式,则取默认请求模式。
      if (obj.mode && !ob.mode) {
        ob.mode = obj.mode;
      }

      // 判断是否有设置默认缓存交互方式，且用户没有配置缓存交互方式,则取默认缓存交互方式。
      if (obj.cache && !ob.cache) {
        ob.cache = obj.cache;
      }

      // 判断是否有设置默认coolie处理方式，且用户没有配置coolie处理方式,则取默认coolie处理方式。
      if (obj.credentiais && !ob.credentiais) {
        ob.credentiais = obj.credentiais;
      }

      // 判断是否有设置默认强制处理子资源，且用户没有配置强制处理子资源,则取默认强制处理子资源。
      if (obj.integrity && !ob.integrity) {
        ob.integrity = obj.integrity;
      }

      // 判断是否有设置默认指示浏览器允许请求存在时间超出页面生命周期,且用户没有配置情况下，则取默认设置的。
      if (obj.keepalive && !ob.keepalives) {
        ob.keepalives = obj.keepalives;
      }

      // 判断是否有设置默认用于指定如何处理重定向响应函数，且用户没有配置，则取默认设置的。
      if (obj.redirect && !ob.redirects) {
        ob.redirects = obj.redirects;
      }

      // 判断是否有设置默认用于指定HTTP的Referer头部的内容，且用户没有配置，则取默认设置的。
      if (obj.referrers && !ob.referrers) {
        ob.referrers = obj.referrers;
      }

      // 判断是否有设置默认转换格式，且用户没有配置，则取默认设置的。
      if (obj.format && !ob.format) {
        ob.format = obj.format;
      }

      // 判断是否有设置默认进度，且用户没有配置，则取默认设置的。
      if (obj.progress && !ob.progress) {
        ob.progress = obj.progress;
      }

      // 调用默认处理函数
      let request = theDefaultProcessing(ob, abortController);

      // 请求拦截器,先判断用户是否有配置请求拦截器
      if (obs.byIntercepting) {
        // 遍历request
        for (var k in request) {
          if (
            k === "url" ||
            k === "method" ||
            k === "body" ||
            k === "cache" ||
            k === "credentials" ||
            k === "integrity" ||
            k === "keepalive" ||
            k === "mode" ||
            k === "redirect" ||
            k === "referrer" ||
            k === "referrerPolicy"
          ) {
            ob[k] = request[k];
          }
        }
        // 先清空配置对象
        request = {};
        // 返回请求拦截器得配置
        await requestBefore(ob, obs);
        // 重新赋值配置对象
        request = theDefaultProcessing(ob, abortController);
      }

      // 开始请求计时
      requestTime(ob.time, interrupt, abortController);

      // 调用请求函数发起请求后再抛出响应回来的Promise对象
      return requestFetch(request, ob, obs, progress);
    };
    return obs;
  } else if (obj.url) {
    // 调用默认处理函数
    let request = theDefaultProcessing(obj, abortController);

    // 开始请求计时
    requestTime(obj.time, interrupt, abortController);

    // 调用请求函数发起请求后再抛出响应回来的Promise对象
    return requestFetch(request, obj, null, progress);
  }
};
export default fetchs;
