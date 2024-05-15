

## redis的配置
位置在`config/database.php`中


**普通节点配置**
```
'redis' => [


    'client' => 'phpredis',


    'cluster' => env('REDIS_CLUSTER', false),


    'default' => [
        'host'     => env('REDIS_HOST', '127.0.0.1'),
        'port'     => env('REDIS_PORT', 6379),
        'database' => env('REDIS_DATABASE', 0),
        'password' => env('REDIS_PASSWORD', null),
    ],


],
```






**加集群的配置**
```


'redis' => [
    'client' => 'phpredis',
    'options' => [
        'cluster' => 'redis',
    ],
    'clusters' => [
        'default' => [
            [
                'host' => env('REDIS_HOST', 'localhost'),
                'password' => env('REDIS_PASSWORD', null),
                'port' => env('REDIS_PORT', 6379),
                'database' => 0,
            ],
        ],
    ],
],
```


**加集群、tls和密码的配置**
```
'redis' => [
        'client' => 'predis',
        'cluster' => env('REDIS_CLUSTER', false),


        // Note! for single redis nodes, the default is defined here.
        // keeping it here for clusters will actually prevent the cluster config
        // from being used, it'll assume single node only.
        //'default' => [
        //    ...
        //],


        // #pro-tip, you can use the Cluster config even for single instances!
        'clusters' => [
            'default' => [
                [
                    'scheme'   => env('REDIS_SCHEME', 'tls'),
                    'host'     => env('REDIS_HOST', 'localhost'),
                    'password' => env('REDIS_PASSWORD', null),
                    'port'     => env('REDIS_PORT', 6379),
                    'database' => env('REDIS_DATABASE', 0),
                ],
            ],
            'options' => [ // Clustering specific options
                'cluster' => 'redis', // This tells Redis Client lib to follow redirects (from cluster)
            ]
        ],
        'options' => [
            'parameters' => [ // Parameters provide defaults for the Connection Factory
                'password' => env('REDIS_PASSWORD', null), // Redirects need PW for the other nodes
                'scheme'   => env('REDIS_SCHEME', 'tls'),  // Redirects also must match scheme
            ],
        ]
    ]
```




## lavarel中的队列的redis配置
位置在`config/queue.php`中
```
'redis' => [
    'driver' => 'redis',
    'connection' => env('QUEUE_REDIS_CONNECTION', 'default'),
    // 'queue' => 'default', // 单节点redis配置
    'queue' => '{default}',  // redis 集群需要改成加"{}"的
    'retry_after' => 60,
    'block_for' => 5,
]
```
如果是redis集群，但是配置中用的是 单节点redis配置，则会报一下错误
```
[2021-10-12 03:26:35] test.ERROR: 服务器出错，Cannot use 'EVAL' with redis-cluster.，/data/game-backend/sdk/vendor/predis/predis/src/Connection/Aggregate/RedisCluster.php,380  
```







