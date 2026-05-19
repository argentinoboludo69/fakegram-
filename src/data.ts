export interface StoryPhoto {
  url?: string;
  caption?: string;
  isTitleSlide?: boolean;
}

export interface Story {
  id: string;
  username: string;
  avatar: string;
  type: "video" | "images";
  videoUrl?: string;
  photos?: StoryPhoto[];
  description?: string;
  groupName?: string;
}

export interface Comment {
  id: string;
  username: string;
  text: string;
}

export interface Post {
  id: string;
  username: string;
  userAvatar: string;
  imageUrl: string;
  title: string;
  likes: number;
  comments: Comment[];
  isVerified?: boolean;
}

const CHOQUEI_AVATAR = "https://upload.wikimedia.org/wikipedia/commons/d/da/Choquei.jpg";
const CHOQUEI_USERNAME = "choquei";

export const INITIAL_STORIES: Story[] = [
  {
    id: "s1",
    username: "@plantao_absurdo",
    avatar: "https://picsum.photos/seed/p1/100/100",
    type: "video",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    groupName: "Plantão Absurdo",
    description: "Vídeo exclusivo do Corsa 2009 abduzindo gados no interior de SP.",
  },
  {
    id: "s2",
    username: "@fofocaverso",
    avatar: "https://picsum.photos/seed/p2/100/100",
    type: "video",
    videoUrl: "https://www.youtube.com/embed/9bZkp7q19f0",
    groupName: "Fofoca Verso",
    description: "Urgente: Pombos estão usando Wi-Fi da prefeitura para se comunicar.",
  },
  {
    id: "s3",
    username: "@alertaurbano",
    avatar: "https://picsum.photos/seed/p3/100/100",
    type: "video",
    videoUrl: "https://www.youtube.com/embed/jNQXAC9IVRw",
    groupName: "Alerta Urbano",
    description: "Miojo é flagrado ouvindo conversa sobre política em cozinha universitária.",
  },
  {
    id: "s4",
    username: "@choquei_fake",
    avatar: CHOQUEI_AVATAR,
    type: "images",
    groupName: "Choquei Fake",
    photos: [
      { isTitleSlide: true, caption: "Choquei Fake" },
      ...Array.from({ length: 9 }).map((_, i) => ({
        url: `https://picsum.photos/seed/slide_a_${i}/1080/1920`,
        caption: `Revelação chocante parte ${i + 1} de 9.`
      }))
    ],
  },
  {
    id: "s5",
    username: "@noticias_reais_sqn",
    avatar: "https://picsum.photos/seed/p5/100/100",
    type: "images",
    groupName: "Notícias Reais (sqn)",
    photos: [
      { isTitleSlide: true, caption: "Notícias Reais (sqn)" },
      ...Array.from({ length: 9 }).map((_, i) => ({
        url: `https://picsum.photos/seed/slide_b_${i}/1080/1920`,
        caption: `O que ninguém te contou sobre os pombos parte ${i + 1}.`
      }))
    ],
  },
  {
    id: "s6",
    username: "@verdade_nua",
    avatar: "https://picsum.photos/seed/p6/100/100",
    type: "images",
    groupName: "Verdade Nua",
    photos: [
      { isTitleSlide: true, caption: "Verdade Nua" },
      ...Array.from({ length: 9 }).map((_, i) => ({
        url: `https://picsum.photos/seed/slide_c_${i}/1080/1920`,
        caption: `A fofofca do miojo continua... parte ${i + 1}.`
      }))
    ],
  },
];

export const INITIAL_POSTS: Post[] = [
  {
    id: "p1",
    username: CHOQUEI_USERNAME,
    userAvatar: CHOQUEI_AVATAR,
    imageUrl: "https://picsum.photos/seed/post1/800/1000",
    title: "Homem afirma ter sido abduzido por um Corsa 2009 prata com escada no teto.",
    likes: 15423,
    isVerified: true,
    comments: [
      { id: "c1", username: "marcos_99", text: "Eu vi! O Corsa correu a 300km/h na contramão!" },
      { id: "c2", username: "alien_lover", text: "Eles estão evoluindo nas escolhas de veículos." }
    ]
  },
  {
    id: "p2",
    username: CHOQUEI_USERNAME,
    userAvatar: CHOQUEI_AVATAR,
    imageUrl: "https://picsum.photos/seed/post2/800/1100",
    title: "Prefeitura proíbe cidadãos de olhar para pombos após meia-noite por motivos de segurança nacional.",
    likes: 8942,
    isVerified: true,
    comments: [
      { id: "c3", username: "pombo_hater", text: "Finalmente uma lei que faz sentido!" },
      { id: "c4", username: "not_a_spy", text: "Isso é censura contra as aves!" }
    ]
  },
  {
    id: "p3",
    username: CHOQUEI_USERNAME,
    userAvatar: CHOQUEI_AVATAR,
    imageUrl: "https://picsum.photos/seed/post3/800/1200",
    title: "Cientistas descobrem que miojo escuta pensamentos e passa as informações para o governo através do tempero.",
    likes: 32100,
    isVerified: true,
    comments: [
      { id: "c5", username: "lamen_fan", text: "Minha vida é um livro aberto para a Nissin." },
      { id: "c6", username: "chef_jacquin", text: "Isso explica por que eles sabem quando eu coloco creme de leite." }
    ]
  },
  {
    id: "p4",
    username: CHOQUEI_USERNAME,
    userAvatar: CHOQUEI_AVATAR,
    imageUrl: "https://picsum.photos/seed/post4/800/1000",
    title: "Gato aprende a falar latim e invoca demônio do petisco na sala de estar.",
    likes: 45012,
    isVerified: true,
    comments: [
      { id: "c7", username: "cat_lady", text: "O meu gatinho só sabe miar por sachê, que inveja!" },
      { id: "c8", username: "exorcista_pet", text: "Cobro barato para resolver, chama no direct." }
    ]
  }
];

export const generateMorePosts = (startIndex: number, count: number): Post[] => {
  const titles = [
    "Geladeira entra em greve e exige férias em Gramado.",
    "Bicicleta é multada por excesso de velocidade em ciclovia de Marte.",
    "Cachorro é eleito prefeito de cidadezinha após prometer osso grátis.",
    "Papel higiênico começa a escrever poemas melancólicos no banheiro.",
    "Nuvem em formato de coxinha causa engarrafamento em rodovia.",
    "Ar-condicionado se apaixona por aquecedor e gera curto-circuito emocional.",
    "Planta carnívora vira vegetariana após retiro espiritual.",
    "Sapato foge de casa para tentar carreira de modelo em Milão.",
    "Xícara de café reclama que está 'muito cheia de si' após ser enchida demais.",
    "Cadeira de escritório exige massagem nas costas dos funcionários."
  ];

  return Array.from({ length: count }).map((_, i) => {
    const id = (startIndex + i).toString();
    return {
      id: `p${id}`,
      username: CHOQUEI_USERNAME,
      userAvatar: CHOQUEI_AVATAR,
      imageUrl: `https://picsum.photos/seed/post${id}/800/${1000 + (Math.random() * 400)}`,
      title: titles[Math.floor(Math.random() * titles.length)],
      likes: Math.floor(Math.random() * 100000),
      isVerified: true,
      comments: [
        { id: `c${id}1`, username: "user_" + id, text: "Uau, inacreditável!" },
        { id: `c${id}2`, username: "bot_" + id, text: "Isso é a mais pura verdade, eu estava lá!" }
      ]
    };
  });
};

