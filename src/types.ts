export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  price?: string;
  image: string;
}

export const SERVICES: Service[] = [
  {
    id: 'haircut',
    title: 'Corte & Design',
    description: 'Transformação personalizada que realça sua beleza natural e estilo único.',
    icon: 'Scissors',
    price: 'R$ 180,00',
    image: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'nails',
    title: 'Manicure & Pedicure',
    description: 'Cuidados luxuosos para suas mãos e pés com acabamento impecável e spa.',
    icon: 'Sparkles',
    price: 'R$ 120,00',
    image: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'coloring',
    title: 'Coloração & Mechas',
    description: 'Técnicas avançadas para cores vibrantes, saudáveis e cheias de vida.',
    icon: 'Palette',
    price: 'R$ 450,00',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'spa',
    title: 'Spa & Estética',
    description: 'Tratamentos faciais e corporais para um relaxamento profundo e renovação.',
    icon: 'Flower2',
    price: 'R$ 320,00',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'makeup',
    title: 'Maquiagem Profissional',
    description: 'Realce sua beleza para momentos especiais com produtos de alta performance.',
    icon: 'Wand2',
    price: 'R$ 250,00',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'eyebrows',
    title: 'Sobrancelhas & Cílios',
    description: 'Design de olhar que traz harmonia e sofisticação ao seu rosto.',
    icon: 'Eye',
    price: 'R$ 150,00',
    image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=800'
  }
];
