module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
            '/static': {
                target: 'http://www.gallstone.com.cn/yxkj/',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/static': ''
                }
            },
            '/newsDetail': {
                target: 'http://www.gallstone.com.cn/',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/newsDetail': ''
                }
            }
        }
    }
}