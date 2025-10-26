const swaggerUi = require("swagger-ui-express");
const config = require("./config");
const { SwaggerTheme, SwaggerThemeNameEnum } = require("swagger-themes");

const theme = new SwaggerTheme();

// Constants dengan message yang lebih descriptive
const API_CONSTANTS = {
  REQUIRED_QUERY: "Input pertanyaan atau perintah untuk AI",
  REQUIRED_URL: "Masukkan URL target yang valid",
  REQUIRED_PROMPT: "Masukkan instruksi khusus untuk AI",
  SUCCESS_RESPONSE: "Permintaan berhasil diproses",
  ERROR_RESPONSE: "Terjadi kesalahan dalam pemrosesan"
};

// Enhanced options dengan fitur tambahan
const options = {
  customSiteTitle: `${config.options.webName} | API Documentation`,
  customfavIcon: config.options.favicon,
  customJs: [
    "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js",
    // Custom script untuk enhancement
    `
    <script>
      document.addEventListener('DOMContentLoaded', function() {
        // Auto focus search box
        const searchInput = document.querySelector('.swagger-ui .opblock-tag-section input');
        if (searchInput) {
          searchInput.placeholder = '🔍 Cari endpoint...';
          searchInput.focus();
        }
        
        // Add custom header
        const header = document.createElement('div');
        header.innerHTML = '<div style="padding: 15px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-align: center; font-weight: bold; font-size: 18px;">🚀 ${config.options.name} - Powerful AI API</div>';
        document.querySelector('.swagger-ui').prepend(header);
        
        // Add footer
        const footer = document.createElement('div');
        footer.innerHTML = '<div style="padding: 10px; text-align: center; color: #888; font-size: 12px; margin-top: 20px;">© 2024 ${config.options.name} - Developed with ❤️ by ${config.options.developer}</div>';
        document.querySelector('.swagger-ui').append(footer);
      });
    </script>
    `
  ],
  customCss: `
    ${theme.getBuffer(SwaggerThemeNameEnum.DARK)}
    
    /* Custom Enhancements */
    .topbar { 
      display: none; 
    }
    
    /* Modern Gradient Background */
    .swagger-ui { 
      background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
      min-height: 100vh;
      padding: 20px;
    }
    
    /* Card Styling */
    .opblock { 
      border-radius: 12px !important;
      margin-bottom: 16px !important;
      box-shadow: 0 4px 20px rgba(0,0,0,0.3) !important;
      border: 1px solid #333 !important;
      overflow: hidden;
    }
    
    /* Tag Styling */
    .opblock-tag { 
      font-size: 18px !important;
      font-weight: bold !important;
      padding: 15px !important;
      border-left: 4px solid #764ba2 !important;
      background: rgba(255,255,255,0.05) !important;
      margin-bottom: 10px !important;
    }
    
    /* Button Enhancement */
    .btn { 
      border-radius: 8px !important;
      transition: all 0.3s ease !important;
      font-weight: 600 !important;
    }
    
    .btn:hover {
      transform: translateY(-2px) !important;
      box-shadow: 0 5px 15px rgba(0,0,0,0.3) !important;
    }
    
    /* Response Area */
    .responses-table { 
      border-radius: 8px !important;
      overflow: hidden;
    }
    
    /* Parameter Styling */
    .parameters { 
      background: rgba(255,255,255,0.05) !important;
      border-radius: 8px !important;
      padding: 15px !important;
      margin: 10px 0 !important;
    }
    
    /* Table Enhancement */
    .parameters-col_name { 
      font-weight: bold !important;
      color: #764ba2 !important;
    }
    
    /* Model Styling */
    .model { 
      background: rgba(255,255,255,0.03) !important;
      border-radius: 8px !important;
      padding: 10px !important;
    }
    
    /* Info Section */
    .info { 
      background: rgba(255,255,255,0.05) !important;
      border-radius: 12px !important;
      padding: 20px !important;
      margin-bottom: 20px !important;
      border-left: 4px solid #667eea !important;
    }
    
    /* Server Selection */
    .servers { 
      background: rgba(255,255,255,0.05) !important;
      border-radius: 8px !important;
      padding: 15px !important;
    }
    
    /* Try It Out Button */
    .try-out__btn {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
      border: none !important;
    }
    
    /* Execute Button */
    .execute {
      background: linear-gradient(135deg, #48bb78 0%, #38a169 100%) !important;
      border: none !important;
    }
    
    /* Code Samples */
    .curl-command { 
      background: #1a202c !important;
      border-radius: 8px !important;
      padding: 15px !important;
    }
  `,
  swaggerOptions: {
    displayRequestDuration: true,
    persistAuthorization: true,
    docExpansion: 'list',
    filter: true,
    showExtensions: true,
    showCommonExtensions: true,
    defaultModelsExpandDepth: 2,
    defaultModelExpandDepth: 2,
    tryItOutEnabled: true,
    displayOperationId: true,
    requestDuration: true
  }
};

// Enhanced Swagger Document dengan metadata lengkap
const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: config.options.name,
    description: `# ${config.options.name}\n\n${config.options.description}\n\n## 🚀 Fitur Utama\n\n- **AI Chat Interface** - Berinteraksi dengan berbagai model AI\n- **Real-time Processing** - Pemrosesan data secara real-time\n- **RESTful API** - Standar API yang mudah diintegrasikan\n\n## 📚 Kategori API\n\n- **AI** - Endpoint untuk Artificial Intelligence\n- **Downloader** - Tools download konten (coming soon)\n- **Tools** - Utilities tambahan (coming soon)\n\n## 🔐 Authentication\n\nAPI ini menggunakan sistem autentikasi sederhana. Hubungi developer untuk mendapatkan akses.\n\n**Developer**: ${config.options.developer}`,
    version: "1.0.0",
    contact: {
      name: "API Support",
      email: "support@example.com",
      url: "https://github.com/your-repo"
    },
    license: {
      name: "MIT",
      url: "https://opensource.org/licenses/MIT"
    },
    "x-logo": {
      url: config.options.favicon,
      backgroundColor: "#FFFFFF",
      altText: config.options.name
    }
  },
  externalDocs: {
    description: "Lihat dokumentasi lengkap",
    url: "https://github.com/your-repo/docs"
  },
  servers: [
    {
      url: config.host.BASE_URL,
      description: "🌐 Production Server"
    },
    {
      url: "http://localhost:3000",
      description: "💻 Development Server"
    }
  ],
  tags: [
    {
      name: "AI",
      description: "🤖 Endpoint untuk Artificial Intelligence dan Machine Learning"
    },
    {
      name: "Downloader",
      description: "📥 Tools download konten dari berbagai platform (Coming Soon)"
    },
    {
      name: "Tools",
      description: "🛠️ Utilities dan tools pendukung (Coming Soon)"
    }
  ],
  paths: {
    "/api/ai/chatgpt": {
      get: {
        tags: ["AI"],
        summary: "💬 Chat dengan GPT AI",
        description: "Berinteraksi dengan model GPT untuk percakapan natural dan intelligent",
        operationId: "chatWithGPT",
        parameters: [
          {
            in: "query",
            name: "query",
            schema: {
              type: "string",
              minLength: 1,
              maxLength: 1000
            },
            required: true,
            description: API_CONSTANTS.REQUIRED_QUERY,
            example: "Jelaskan apa itu artificial intelligence dalam bahasa Indonesia"
          },
          {
            in: "query",
            name: "style",
            schema: {
              type: "string",
              enum: ["formal", "casual", "technical", "simple"],
              default: "casual"
            },
            required: false,
            description: "Gaya respons yang diinginkan",
            example: "casual"
          }
        ],
        responses: {
          200: {
            description: API_CONSTANTS.SUCCESS_RESPONSE,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: {
                      type: "boolean",
                      example: true
                    },
                    developer: {
                      type: "string",
                      example: config.options.developer
                    },
                    timestamp: {
                      type: "string",
                      format: "date-time",
                      example: new Date().toISOString()
                    },
                    execution_time: {
                      type: "number",
                      example: 1.23
                    },
                    result: {
                      type: "object",
                      properties: {
                        message: {
                          type: "string",
                          example: "Halo! Saya AI assistant. Ada yang bisa saya bantu hari ini?"
                        },
                        style: {
                          type: "string",
                          example: "casual"
                        },
                        tokens_used: {
                          type: "number",
                          example: 150
                        }
                      }
                    }
                  }
                },
                examples: {
                  success: {
                    summary: "Contoh respons sukses",
                    value: {
                      status: true,
                      developer: config.options.developer,
                      timestamp: new Date().toISOString(),
                      execution_time: 1.23,
                      result: {
                        message: "Artificial Intelligence adalah bidang ilmu komputer yang fokus pada pembuatan mesin yang bisa belajar dan berpikir seperti manusia.",
                        style: "casual",
                        tokens_used: 150
                      }
                    }
                  }
                }
              }
            }
          },
          400: {
            description: API_CONSTANTS.ERROR_RESPONSE,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse"
                },
                examples: {
                  missingQuery: {
                    summary: "Query parameter missing",
                    value: {
                      status: false,
                      error: "Parameter 'query' diperlukan",
                      code: 400
                    }
                  }
                }
              }
            }
          },
          500: {
            description: "Internal server error",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/ai/gptlogic": {
      get: {
        tags: ["AI"],
        summary: "🧠 GPT dengan Logic Processing",
        description: "GPT dengan kemampuan pemrosesan logika dan instruksi khusus untuk tugas kompleks",
        operationId: "gptWithLogic",
        parameters: [
          {
            in: "query",
            name: "query",
            schema: {
              type: "string",
              minLength: 1,
              maxLength: 2000
            },
            required: true,
            description: API_CONSTANTS.REQUIRED_QUERY,
            example: "Jelaskan konsep blockchain dan berikan contoh penggunaannya"
          },
          {
            in: "query",
            name: "prompt",
            schema: {
              type: "string",
              enum: ["analisis", "ringkas", "jelaskan", "terjemahkan", "evaluasi"],
              default: "jelaskan"
            },
            required: true,
            description: API_CONSTANTS.REQUIRED_PROMPT,
            example: "jelaskan"
          },
          {
            in: "query",
            name: "complexity",
            schema: {
              type: "string",
              enum: ["simple", "medium", "detailed"],
              default: "medium"
            },
            required: false,
            description: "Tingkat kompleksitas respons",
            example: "medium"
          }
        ],
        responses: {
          200: {
            description: API_CONSTANTS.SUCCESS_RESPONSE,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: {
                      type: "boolean",
                      example: true
                    },
                    developer: {
                      type: "string",
                      example: config.options.developer
                    },
                    timestamp: {
                      type: "string",
                      format: "date-time",
                      example: new Date().toISOString()
                    },
                    execution_time: {
                      type: "number",
                      example: 2.45
                    },
                    result: {
                      type: "object",
                      properties: {
                        message: {
                          type: "string",
                          example: "Blockchain adalah teknologi ledger terdistribusi yang mencatat transaksi secara aman dan transparan..."
                        },
                        prompt_type: {
                          type: "string",
                          example: "jelaskan"
                        },
                        complexity: {
                          type: "string",
                          example: "medium"
                        },
                        word_count: {
                          type: "number",
                          example: 250
                        },
                        key_points: {
                          type: "array",
                          items: {
                            type: "string"
                          },
                          example: ["Distributed ledger", "Immutable records", "Decentralized consensus"]
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  components: {
    schemas: {
      ErrorResponse: {
        type: "object",
        properties: {
          status: {
            type: "boolean",
            example: false
          },
          error: {
            type: "string",
            example: "Error message description"
          },
          code: {
            type: "integer",
            example: 400
          },
          timestamp: {
            type: "string",
            format: "date-time",
            example: new Date().toISOString()
          }
        }
      },
      SuccessResponse: {
        type: "object",
        properties: {
          status: {
            type: "boolean",
            example: true
          },
          developer: {
            type: "string"
          },
          timestamp: {
            type: "string",
            format: "date-time"
          },
          execution_time: {
            type: "number"
          }
        }
      }
    },
    securitySchemes: {
      ApiKey: {
        type: "apiKey",
        name: "X-API-Key",
        in: "header",
        description: "API Key untuk akses endpoint"
      }
    }
  },
  security: [
    {
      ApiKey: []
    }
  ],
  "x-metadata": {
    generated: new Date().toISOString(),
    version: "2.0",
    author: config.options.developer,
    documentation: "https://github.com/your-repo/docs"
  }
};

module.exports = { swaggerDocument, options };
