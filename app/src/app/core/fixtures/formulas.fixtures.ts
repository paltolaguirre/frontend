import { FormulaCategory } from './../models/formula-category.model';
export class FormulaFixtures {
  static getAll() {
    return [
      {
        name: 'Sum',
        CreatedAt: '2020-02-26T17:14:38.962588+03:00',
        UpdatedAt: '2020-02-26T17:14:38.962588+03:00',
        DeletedAt: null,
        params: [
          {
            ID: 51,
            CreatedAt: '2020-02-26T17:14:38.964804+03:00',
            UpdatedAt: '2020-02-26T17:14:38.964804+03:00',
            DeletedAt: null,
            name: 'val1',
            type: 'number',
            functionname: 'Sum'
          },
          {
            ID: 52,
            CreatedAt: '2020-02-26T17:14:38.966603+03:00',
            UpdatedAt: '2020-02-26T17:14:38.966603+03:00',
            DeletedAt: null,
            name: 'val2',
            type: 'number',
            functionname: 'Sum'
          }
        ],
        description: '',
        origin: 'primitive',
        type: 'operator',
        scope: 'public',
        result: 'number',
        value: {
          ID: 113,
          CreatedAt: '2020-02-26T17:14:38.960526+03:00',
          UpdatedAt: '2020-02-26T17:14:38.960526+03:00',
          DeletedAt: null,
          name: '',
          valuenumber: 0,
          valuestring: '',
          Valueboolean: false,
          valueinvoke: null,
          valueinvokeid: 0,
          arginvokeid: 0
        },
        valueid: 113
      },
      {
        name: 'TotalImporteRemunerativo',
        CreatedAt: '2020-02-26T17:16:54.770727+03:00',
        UpdatedAt: '2020-02-26T17:16:54.770727+03:00',
        DeletedAt: null,
        params: [
          {
            ID: 53,
            CreatedAt: '2020-02-26T17:16:54.772833+03:00',
            UpdatedAt: '2020-02-26T17:16:54.772833+03:00',
            DeletedAt: null,
            name: 'liquidacion',
            type: 'object',
            functionname: 'TotalImporteRemunerativo'
          }
        ],
        description: 'dada una liquidacion obtiene la suma total de importes remunerativos de la misma',
        origin: 'primitive',
        type: 'helper',
        scope: 'public',
        result: 'number',
        value: {
          ID: 114,
          CreatedAt: '2020-02-26T17:16:54.764358+03:00',
          UpdatedAt: '2020-02-26T17:16:54.764358+03:00',
          DeletedAt: null,
          name: '',
          valuenumber: 0,
          valuestring: '',
          Valueboolean: false,
          valueinvoke: null,
          valueinvokeid: 0,
          arginvokeid: 0
        },
        valueid: 114
      },
      {
        name: 'GetParamValue',
        CreatedAt: '2020-02-07T01:10:52.945184+03:00',
        UpdatedAt: '2020-02-26T22:40:52.16479+03:00',
        DeletedAt: null,
        params: [
          {
            ID: 1,
            CreatedAt: '2020-02-07T01:10:53.358192+03:00',
            UpdatedAt: '2020-02-07T01:10:53.358192+03:00',
            DeletedAt: null,
            name: 'paramName',
            type: 'string',
            functionname: 'GetParamValue'
          },
          {
            ID: 65,
            CreatedAt: '2020-02-26T22:40:52.168719+03:00',
            UpdatedAt: '2020-02-26T22:40:52.168719+03:00',
            DeletedAt: null,
            name: 'paramName',
            type: 'string',
            functionname: 'GetParamValue'
          },
          {
            ID: 66,
            CreatedAt: '2020-02-26T22:40:52.170349+03:00',
            UpdatedAt: '2020-02-26T22:40:52.170349+03:00',
            DeletedAt: null,
            name: 'anotherParam',
            type: '',
            functionname: 'GetParamValue'
          }
        ],
        description: '',
        origin: 'primitive',
        type: 'internal',
        scope: 'public',
        result: 'number',
        value: {
          ID: 166,
          CreatedAt: '2020-02-07T01:10:52.509046+03:00',
          UpdatedAt: '2020-02-07T01:10:52.509046+03:00',
          DeletedAt: null,
          name: 'return',
          valuenumber: 0,
          valuestring: '',
          Valueboolean: false,
          valueinvoke: null,
          valueinvokeid: 0,
          arginvokeid: 0
        },
        valueid: 166
      },
      {
        name: 'test',
        CreatedAt: '2020-03-02T19:00:07.728369+03:00',
        UpdatedAt: '2020-03-03T15:42:13.514744+03:00',
        DeletedAt: null,
        params: [
          {
            ID: 87,
            CreatedAt: '2020-03-02T19:00:07.733969+03:00',
            UpdatedAt: '2020-03-03T15:42:13.516474+03:00',
            DeletedAt: null,
            name: 'val1',
            type: 'number',
            functionname: 'test'
          },
          {
            ID: 88,
            CreatedAt: '2020-03-02T19:00:31.662611+03:00',
            UpdatedAt: '2020-03-03T15:42:13.517953+03:00',
            DeletedAt: null,
            name: 'val2',
            type: 'number',
            functionname: 'test'
          }
        ],
        description: 'descripcion',
        origin: 'custom',
        type: 'generic',
        scope: 'private',
        result: 'number',
        value: {
          ID: 281,
          CreatedAt: '2020-03-02T19:00:07.719167+03:00',
          UpdatedAt: '2020-03-02T19:00:07.719167+03:00',
          DeletedAt: null,
          name: '',
          valuenumber: 0,
          valuestring: '',
          Valueboolean: false,
          valueinvoke: null,
          valueinvokeid: 0,
          arginvokeid: 0
        },
        valueid: 281
      },
      {
        name: 'sumExt',
        CreatedAt: '2020-02-08T06:32:07.102708+03:00',
        UpdatedAt: '2020-03-03T15:56:41.955047+03:00',
        DeletedAt: null,
        params: [
          {
            ID: 47,
            CreatedAt: '2020-02-08T06:32:07.923464+03:00',
            UpdatedAt: '2020-03-03T15:56:41.956758+03:00',
            DeletedAt: null,
            name: 'v2',
            type: 'number',
            functionname: 'sumExt'
          },
          {
            ID: 86,
            CreatedAt: '2020-02-27T21:31:17.958277+03:00',
            UpdatedAt: '2020-03-03T15:56:41.958164+03:00',
            DeletedAt: null,
            name: 'v3',
            type: '',
            functionname: 'sumExt'
          }
        ],
        description: '',
        origin: 'custom',
        type: 'operator',
        scope: 'private',
        result: 'number',
        value: {
          ID: 297,
          CreatedAt: '2020-02-27T14:59:50.888082+03:00',
          UpdatedAt: '2020-02-27T14:59:50.888082+03:00',
          DeletedAt: null,
          name: '',
          valuenumber: 0,
          valuestring: '',
          Valueboolean: false,
          valueinvoke: {
            ID: 172,
            CreatedAt: '2020-02-27T14:59:50.882771+03:00',
            UpdatedAt: '2020-02-27T14:59:50.882771+03:00',
            DeletedAt: null,
            function: {
              name: 'Sum',
              CreatedAt: '2020-02-26T17:14:38.962588+03:00',
              UpdatedAt: '2020-02-26T17:14:38.962588+03:00',
              DeletedAt: null,
              params: [
                {
                  ID: 51,
                  CreatedAt: '2020-02-26T17:14:38.964804+03:00',
                  UpdatedAt: '2020-02-26T17:14:38.964804+03:00',
                  DeletedAt: null,
                  name: 'val1',
                  type: 'number',
                  functionname: 'Sum'
                },
                {
                  ID: 52,
                  CreatedAt: '2020-02-26T17:14:38.966603+03:00',
                  UpdatedAt: '2020-02-26T17:14:38.966603+03:00',
                  DeletedAt: null,
                  name: 'val2',
                  type: 'number',
                  functionname: 'Sum'
                }
              ],
              description: '',
              origin: 'primitive',
              type: 'operator',
              scope: 'public',
              result: 'number',
              value: {
                ID: 113,
                CreatedAt: '2020-02-26T17:14:38.960526+03:00',
                UpdatedAt: '2020-02-26T17:14:38.960526+03:00',
                DeletedAt: null,
                name: '',
                valuenumber: 0,
                valuestring: '',
                Valueboolean: false,
                valueinvoke: null,
                valueinvokeid: 0,
                arginvokeid: 0
              },
              valueid: 113
            },
            functionname: 'Sum',
            args: [
              {
                ID: 291,
                CreatedAt: '2020-02-27T14:59:50.863258+03:00',
                UpdatedAt: '2020-03-03T15:56:41.949945+03:00',
                DeletedAt: null,
                name: 'val1',
                valuenumber: 0,
                valuestring: '',
                Valueboolean: false,
                valueinvoke: {
                  ID: 168,
                  CreatedAt: '2020-02-27T14:59:50.85973+03:00',
                  UpdatedAt: '2020-02-27T14:59:50.85973+03:00',
                  DeletedAt: null,
                  function: {
                    name: 'GetParamValue',
                    CreatedAt: '2020-02-07T01:10:52.945184+03:00',
                    UpdatedAt: '2020-02-26T22:40:52.16479+03:00',
                    DeletedAt: null,
                    params: [
                      {
                        ID: 1,
                        CreatedAt: '2020-02-07T01:10:53.358192+03:00',
                        UpdatedAt: '2020-02-07T01:10:53.358192+03:00',
                        DeletedAt: null,
                        name: 'paramName',
                        type: 'string',
                        functionname: 'GetParamValue'
                      },
                      {
                        ID: 65,
                        CreatedAt: '2020-02-26T22:40:52.168719+03:00',
                        UpdatedAt: '2020-02-26T22:40:52.168719+03:00',
                        DeletedAt: null,
                        name: 'paramName',
                        type: 'string',
                        functionname: 'GetParamValue'
                      },
                      {
                        ID: 66,
                        CreatedAt: '2020-02-26T22:40:52.170349+03:00',
                        UpdatedAt: '2020-02-26T22:40:52.170349+03:00',
                        DeletedAt: null,
                        name: 'anotherParam',
                        type: '',
                        functionname: 'GetParamValue'
                      }
                    ],
                    description: '',
                    origin: 'primitive',
                    type: 'internal',
                    scope: 'public',
                    result: 'number',
                    value: {
                      ID: 166,
                      CreatedAt: '2020-02-07T01:10:52.509046+03:00',
                      UpdatedAt: '2020-02-07T01:10:52.509046+03:00',
                      DeletedAt: null,
                      name: 'return',
                      valuenumber: 0,
                      valuestring: '',
                      Valueboolean: false,
                      valueinvoke: null,
                      valueinvokeid: 0,
                      arginvokeid: 0
                    },
                    valueid: 166
                  },
                  functionname: 'GetParamValue',
                  args: [
                    {
                      ID: 290,
                      CreatedAt: '2020-02-27T14:59:50.857862+03:00',
                      UpdatedAt: '2020-03-03T15:56:41.928951+03:00',
                      DeletedAt: null,
                      name: 'paramName',
                      valuenumber: 0,
                      valuestring: 'v1',
                      Valueboolean: false,
                      valueinvoke: null,
                      valueinvokeid: 0,
                      arginvokeid: 168
                    }
                  ]
                },
                valueinvokeid: 168,
                arginvokeid: 172
              },
              {
                ID: 296,
                CreatedAt: '2020-02-27T14:59:50.881349+03:00',
                UpdatedAt: '2020-03-03T15:56:41.951606+03:00',
                DeletedAt: null,
                name: 'val2',
                valuenumber: 0,
                valuestring: '',
                Valueboolean: false,
                valueinvoke: {
                  ID: 171,
                  CreatedAt: '2020-02-27T14:59:50.876702+03:00',
                  UpdatedAt: '2020-02-27T14:59:50.876702+03:00',
                  DeletedAt: null,
                  function: {
                    name: 'Sum',
                    CreatedAt: '2020-02-26T17:14:38.962588+03:00',
                    UpdatedAt: '2020-02-26T17:14:38.962588+03:00',
                    DeletedAt: null,
                    params: [
                      {
                        ID: 51,
                        CreatedAt: '2020-02-26T17:14:38.964804+03:00',
                        UpdatedAt: '2020-02-26T17:14:38.964804+03:00',
                        DeletedAt: null,
                        name: 'val1',
                        type: 'number',
                        functionname: 'Sum'
                      },
                      {
                        ID: 52,
                        CreatedAt: '2020-02-26T17:14:38.966603+03:00',
                        UpdatedAt: '2020-02-26T17:14:38.966603+03:00',
                        DeletedAt: null,
                        name: 'val2',
                        type: 'number',
                        functionname: 'Sum'
                      }
                    ],
                    description: '',
                    origin: 'primitive',
                    type: 'operator',
                    scope: 'public',
                    result: 'number',
                    value: {
                      ID: 113,
                      CreatedAt: '2020-02-26T17:14:38.960526+03:00',
                      UpdatedAt: '2020-02-26T17:14:38.960526+03:00',
                      DeletedAt: null,
                      name: '',
                      valuenumber: 0,
                      valuestring: '',
                      Valueboolean: false,
                      valueinvoke: null,
                      valueinvokeid: 0,
                      arginvokeid: 0
                    },
                    valueid: 113
                  },
                  functionname: 'Sum',
                  args: [
                    {
                      ID: 293,
                      CreatedAt: '2020-02-27T14:59:50.869046+03:00',
                      UpdatedAt: '2020-03-03T15:56:41.943715+03:00',
                      DeletedAt: null,
                      name: 'val1',
                      valuenumber: 0,
                      valuestring: '',
                      Valueboolean: false,
                      valueinvoke: {
                        ID: 169,
                        CreatedAt: '2020-02-27T14:59:50.866101+03:00',
                        UpdatedAt: '2020-02-27T14:59:50.866101+03:00',
                        DeletedAt: null,
                        function: {
                          name: 'GetParamValue',
                          CreatedAt: '2020-02-07T01:10:52.945184+03:00',
                          UpdatedAt: '2020-02-26T22:40:52.16479+03:00',
                          DeletedAt: null,
                          params: [
                            {
                              ID: 1,
                              CreatedAt: '2020-02-07T01:10:53.358192+03:00',
                              UpdatedAt: '2020-02-07T01:10:53.358192+03:00',
                              DeletedAt: null,
                              name: 'paramName',
                              type: 'string',
                              functionname: 'GetParamValue'
                            },
                            {
                              ID: 65,
                              CreatedAt: '2020-02-26T22:40:52.168719+03:00',
                              UpdatedAt: '2020-02-26T22:40:52.168719+03:00',
                              DeletedAt: null,
                              name: 'paramName',
                              type: 'string',
                              functionname: 'GetParamValue'
                            },
                            {
                              ID: 66,
                              CreatedAt: '2020-02-26T22:40:52.170349+03:00',
                              UpdatedAt: '2020-02-26T22:40:52.170349+03:00',
                              DeletedAt: null,
                              name: 'anotherParam',
                              type: '',
                              functionname: 'GetParamValue'
                            }
                          ],
                          description: '',
                          origin: 'primitive',
                          type: 'internal',
                          scope: 'public',
                          result: 'number',
                          value: {
                            ID: 166,
                            CreatedAt: '2020-02-07T01:10:52.509046+03:00',
                            UpdatedAt: '2020-02-07T01:10:52.509046+03:00',
                            DeletedAt: null,
                            name: 'return',
                            valuenumber: 0,
                            valuestring: '',
                            Valueboolean: false,
                            valueinvoke: null,
                            valueinvokeid: 0,
                            arginvokeid: 0
                          },
                          valueid: 166
                        },
                        functionname: 'GetParamValue',
                        args: [
                          {
                            ID: 292,
                            CreatedAt: '2020-02-27T14:59:50.864658+03:00',
                            UpdatedAt: '2020-03-03T15:56:41.934405+03:00',
                            DeletedAt: null,
                            name: 'paramName',
                            valuenumber: 0,
                            valuestring: 'v2',
                            Valueboolean: false,
                            valueinvoke: null,
                            valueinvokeid: 0,
                            arginvokeid: 169
                          }
                        ]
                      },
                      valueinvokeid: 169,
                      arginvokeid: 171
                    },
                    {
                      ID: 295,
                      CreatedAt: '2020-02-27T14:59:50.874614+03:00',
                      UpdatedAt: '2020-03-03T15:56:41.945377+03:00',
                      DeletedAt: null,
                      name: 'val2',
                      valuenumber: 0,
                      valuestring: '',
                      Valueboolean: false,
                      valueinvoke: {
                        ID: 170,
                        CreatedAt: '2020-02-27T14:59:50.871825+03:00',
                        UpdatedAt: '2020-02-27T14:59:50.871825+03:00',
                        DeletedAt: null,
                        function: {
                          name: 'GetParamValue',
                          CreatedAt: '2020-02-07T01:10:52.945184+03:00',
                          UpdatedAt: '2020-02-26T22:40:52.16479+03:00',
                          DeletedAt: null,
                          params: [
                            {
                              ID: 1,
                              CreatedAt: '2020-02-07T01:10:53.358192+03:00',
                              UpdatedAt: '2020-02-07T01:10:53.358192+03:00',
                              DeletedAt: null,
                              name: 'paramName',
                              type: 'string',
                              functionname: 'GetParamValue'
                            },
                            {
                              ID: 65,
                              CreatedAt: '2020-02-26T22:40:52.168719+03:00',
                              UpdatedAt: '2020-02-26T22:40:52.168719+03:00',
                              DeletedAt: null,
                              name: 'paramName',
                              type: 'string',
                              functionname: 'GetParamValue'
                            },
                            {
                              ID: 66,
                              CreatedAt: '2020-02-26T22:40:52.170349+03:00',
                              UpdatedAt: '2020-02-26T22:40:52.170349+03:00',
                              DeletedAt: null,
                              name: 'anotherParam',
                              type: '',
                              functionname: 'GetParamValue'
                            }
                          ],
                          description: '',
                          origin: 'primitive',
                          type: 'internal',
                          scope: 'public',
                          result: 'number',
                          value: {
                            ID: 166,
                            CreatedAt: '2020-02-07T01:10:52.509046+03:00',
                            UpdatedAt: '2020-02-07T01:10:52.509046+03:00',
                            DeletedAt: null,
                            name: 'return',
                            valuenumber: 0,
                            valuestring: '',
                            Valueboolean: false,
                            valueinvoke: null,
                            valueinvokeid: 0,
                            arginvokeid: 0
                          },
                          valueid: 166
                        },
                        functionname: 'GetParamValue',
                        args: [
                          {
                            ID: 294,
                            CreatedAt: '2020-02-27T14:59:50.870359+03:00',
                            UpdatedAt: '2020-03-03T15:56:41.939698+03:00',
                            DeletedAt: null,
                            name: 'paramName',
                            valuenumber: 0,
                            valuestring: 'v3',
                            Valueboolean: false,
                            valueinvoke: null,
                            valueinvokeid: 0,
                            arginvokeid: 170
                          }
                        ]
                      },
                      valueinvokeid: 170,
                      arginvokeid: 171
                    }
                  ]
                },
                valueinvokeid: 171,
                arginvokeid: 172
              }
            ]
          },
          valueinvokeid: 172,
          arginvokeid: 0
        },
        valueid: 297
      }
    ];
  }

  static getFormulaCategories(): FormulaCategory[] {
    return [
      {
        id: 1,
        title: '',
        items: [
          {
            id: 1,
            img: 'assets/img/icono_search.png',
            imgActive: 'assets/img/icono_search_selec.png',
            title: 'Buscar',
            categoryId: 1,
            slug: 'search'
          }
        ]
      },
      {
        id: 2,
        title: 'Elementos',
        items: [
          {
            id: 2,
            img: 'assets/img/icono_variables.png',
            imgActive: 'assets/img/icono_variables_selec.png',
            title: 'Variables',
            categoryId: 2,
            slug: 'variables'
          },
          {
            id: 3,
            img: 'assets/img/icono_conceptos.png',
            imgActive: 'assets/img/icono_conceptos_selec.png',
            title: 'Conceptos en la liquidación',
            categoryId: 2,
            slug: 'concept'
          },
          {
            id: 4,
            img: 'assets/img/icono_parametros.png',
            imgActive: 'assets/img/icono_parametros_selec.png',
            title: 'Parámetros de entrada',
            categoryId: 2,
            slug: 'input-params'
          }
        ]
      },
      {
        id: 3,
        title: 'Fórmulas',
        items: [
          {
            id: 5,
            img: 'assets/img/icono_formulas_xubio.png',
            imgActive: 'assets/img/icono_formulas_xubio_selec.png',
            title: 'Fórmulas estandar',
            categoryId: 3,
            slug: 'standard-formulas'
          },
          {
            id: 6,
            img: 'assets/img/icono_favoritas.png',
            imgActive: 'assets/img/icono_favoritas_selec.png',
            title: 'Mis fórmulas',
            categoryId: 3,
            slug: 'user-formulas'
          }
        ]
      }
    ];
  }
}