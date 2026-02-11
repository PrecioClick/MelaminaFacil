
// products.config.js
module.exports = {
  prices: {
    VELADOR_40: process.env.PRICE_VELADOR_40,
    MUEBLE_60: process.env.PRICE_MUEBLE_60,
    CLOSET_80: process.env.PRICE_CLOSET_80,
    REPISA: process.env.PRICE_REPISA,
    ESCRITORIO: process.env.PRICE_ESCRITORIO
  },
  downloads: {
    VELADOR_40: [
      { key: "premium/velador40/velador40.skp", label: "Archivo SketchUp (.skp)" },
      { key: "premium/velador40/velador40_planos.pdf", label: "Planos y despiece (PDF)" },
      { key: "premium/velador40/renders.zip", label: "Renders (ZIP)" }
    ],
    MUEBLE_60: [
      { key: "premium/mueble60/mueble60.skp", label: "SketchUp (.skp)" },
      { key: "premium/mueble60/mueble60_planos.pdf", label: "Planos y despiece (PDF)" },
      { key: "premium/mueble60/renders.zip", label: "Renders (ZIP)" }
    ],
    CLOSET_80: [
      { key: "premium/closet80/closet80.skp", label: "SketchUp (.skp)" },
      { key: "premium/closet80/closet80_planos.pdf", label: "Planos y despiece (PDF)" }
    ],
    REPISA: [
      { key: "premium/repisa/repisa.skp", label: "SketchUp (.skp)" },
      { key: "premium/repisa/repisa_planos.pdf", label: "Planos y despiece (PDF)" }
    ],
    ESCRITORIO: [
      { key: "premium/escritorio/escritorio.skp", label: "SketchUp (.skp)" },
      { key: "premium/escritorio/escritorio_planos.pdf", label: "Planos y despiece (PDF)" }
    ]
  }
};
