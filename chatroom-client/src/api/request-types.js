/**
 * HTTP动词类别
 */

//GET类型
export const GET = "GET";           //从服务器取出资源（一项或者多项
export const DELETE = "DELETE";     //从服务器删除资源
//POST类型
export const POST = "POST";         //在服务器新建一个资源（反正除了取数据和删除就都用post，而post又可以分为更新全部和更新指定
export const PUT = "PUT";           //在服务器更新资源（客户端提供改变后的完整资源，即该动词形式应为创建或者更新
export const PATCH = "PATCH";       //在服务器更新资源（客户端提供改变的属性


//比较少用的
export const HEAD = "HEAD";         //获取资源的元数据
export const OPTIONS = "OPTIONS";   //获取信息，关于资源的那些属性是客户端可以改变的