const SEED_DATA = {
  works: [
    {
      id: "work_1",
      titleEn: "Emerging Light",
      titleVi: "Ánh Sáng Mới Nổi",
      chapter: 1,
      materialEn: "Dó paper and charcoal",
      materialVi: "Giấy Dó và chì than",
      dimensions: "60 x 80 cm",
      year: 2024,
      image: "assets/landscape.jpg",
      descriptionEn: "Exploring the fragile boundary of early memories through delicate textures of Dó paper.",
      descriptionVi: "Khám phá ranh giới mong manh của ký ức sơ khởi qua kết cấu nhạy cảm của giấy Dó.",
      status: "exhibited",
      relatedJournalIds: ["journal_1"],
      relatedNoteIds: ["note_1"]
    },
    {
      id: "work_2",
      titleEn: "Departure in Silence",
      titleVi: "Ra Đi Trong Tĩnh Lặng",
      chapter: 2,
      materialEn: "Oil and gold leaf on canvas",
      materialVi: "Sơn dầu và thếp vàng trên toan",
      dimensions: "100 x 100 cm",
      year: 2025,
      image: "assets/abstract.jpg",
      descriptionEn: "A visual poem capturing maternal connections and migration journeys.",
      descriptionVi: "Một bài thơ thị giác ghi lại kết nối mẫu tử và hành trình di cư.",
      status: "available",
      relatedJournalIds: ["journal_2"],
      relatedNoteIds: []
    },
    {
      id: "work_3",
      titleEn: "Fragile Skin",
      titleVi: "Lớp Da Mong Manh",
      chapter: 3,
      materialEn: "Stitched silk and thread",
      materialVi: "Lụa khâu và chỉ",
      dimensions: "80 x 120 cm",
      year: 2025,
      image: "assets/portrait.jpg",
      descriptionEn: "Interpreting feminine identity and vulnerability through stitching and reconstruction.",
      descriptionVi: "Thể hiện bản sắc nữ giới và sự dễ tổn thương thông qua những đường khâu vá và tái cấu trúc.",
      status: "exhibited",
      relatedJournalIds: [],
      relatedNoteIds: ["note_2"]
    },
    {
      id: "work_4",
      titleEn: "Inner Gravity",
      titleVi: "Trọng Lực Nội Tâm",
      chapter: 5,
      materialEn: "Mixed media on canvas",
      materialVi: "Chất liệu tổng hợp trên toan",
      dimensions: "120 x 120 cm",
      year: 2026,
      image: "assets/still_life.jpg",
      descriptionEn: "Investigating the void and spiritual gravity of consciousness.",
      descriptionVi: "Khảo sát về khoảng không và trọng lực tinh thần của tâm thức.",
      status: "sold",
      relatedJournalIds: [],
      relatedNoteIds: []
    }
  ],
  journal: [
    {
      id: "journal_1",
      titleEn: "Fragment of a Dream",
      titleVi: "Mảnh Vụn Một Cơn Mơ",
      contentEn: "Time passes through us like water through sand.\nLeaving only the imprint of what was once heavy.",
      contentVi: "Thời gian đi qua ta như nước qua cát.\nChỉ để lại dấu vết của những gì từng nặng lòng.",
      date: "2024-11-12",
      locationEn: "Hue",
      locationVi: "Huế",
      image: "assets/landscape.jpg"
    },
    {
      id: "journal_2",
      titleEn: "Stitching Memories",
      titleVi: "Khâu Lại Ký Ức",
      contentEn: "Each stitch is a silence.\nEach thread is a connection back to the origin.",
      contentVi: "Mỗi mũi khâu là một khoảng lặng.\nMỗi sợi chỉ là một kết nối quay về nguồn cội.",
      date: "2025-03-05",
      locationEn: "Saigon",
      locationVi: "Sài Gòn"
    }
  ],
  fieldNotes: [
    {
      id: "note_1",
      category: "travel",
      titleEn: "Observations by the Bosporus",
      titleVi: "Quan sát bên bờ sông Bosporus",
      contentEn: "The blue of Istanbul is unlike any other. It carries the weight of history and water.",
      contentVi: "Màu xanh của Istanbul không giống bất kỳ nơi nào. Nó mang sức nặng của lịch sử và nước.",
      date: "2024-05-10",
      locationEn: "Istanbul",
      locationVi: "Istanbul",
      countryEn: "Turkey",
      countryVi: "Thổ Nhĩ Kỳ",
      image: "assets/landscape.jpg"
    },
    {
      id: "note_2",
      category: "observation",
      titleEn: "The Language of Stitching",
      titleVi: "Ngôn Ngữ Của Những Mũi Khâu",
      contentEn: "In Korea, I saw women sewing patchwork cloths. It felt like repairing history.",
      contentVi: "Tại Hàn Quốc, tôi thấy những người phụ nữ khâu vải vụn. Cảm giác như đang vá lại lịch sử.",
      date: "2025-01-20",
      locationEn: "Seoul",
      locationVi: "Seoul",
      countryEn: "Korea",
      countryVi: "Hàn Quốc"
    }
  ],
  publications: [
    {
      id: "pub_1",
      titleEn: "The Poetry of Impermanence",
      titleVi: "Thơ Ca Của Sự Vô Thường",
      descriptionEn: "Exhibition Catalogue published by Hanoi Art Center, 2025.",
      descriptionVi: "Catalogue triển lãm xuất bản bởi Trung tâm Nghệ thuật Hà Nội, 2025.",
      pdfUrl: "#",
      coverImage: "assets/landscape.jpg"
    }
  ],
  archive: [
    {
      id: "arc_1",
      category: "sketches",
      titleEn: "Charcoal Sketch on Dó",
      titleVi: "Phác thảo chì than trên giấy Dó",
      image: "assets/portrait.jpg",
      date: "2024",
      descriptionEn: "Initial study for the Emerging Presence chapter.",
      descriptionVi: "Nghiên cứu ban đầu cho chương Sự Hiện Diện Mới Nổi."
    }
  ],
  cv: [
    {
      id: "cv_1",
      category: "solo",
      year: 2025,
      titleEn: "Emerging Presence",
      titleVi: "Sự Hiện Diện Mới Nổi",
      locationEn: "Art Center, Hanoi, Vietnam",
      locationVi: "Trung tâm Nghệ thuật, Hà Nội, Việt Nam"
    },
    {
      id: "cv_2",
      category: "group",
      year: 2024,
      titleEn: "Southeast Asian Contemporary Archive",
      titleVi: "Lưu Trữ Nghệ Thuật Đương Đại Đông Nam Á",
      locationEn: "National Gallery, Singapore",
      locationVi: "Phòng Trưng Bày Quốc Gia, Singapore"
    }
  ]
};

export function getDatabase() {
  const data = localStorage.getItem("artistic_archive_db");
  if (!data) {
    localStorage.setItem("artistic_archive_db", JSON.stringify(SEED_DATA));
    return SEED_DATA;
  }
  return JSON.parse(data);
}

export function saveDatabase(db) {
  localStorage.setItem("artistic_archive_db", JSON.stringify(db));
}

export function resetDatabaseToSeed() {
  localStorage.setItem("artistic_archive_db", JSON.stringify(SEED_DATA));
  return SEED_DATA;
}

export function getSeedData() {
  return SEED_DATA;
}
