-- Script de exemplo para popular o banco com dados de teste
-- Execute este script no SQL Editor do Supabase após executar schema.sql

-- Inserir produtos de exemplo
INSERT INTO products (name, slug, category, description, price, show_price, active) VALUES
('Camiseta Básica Preta', 'camiseta-basica-preta', 'VAREJO', 'Camiseta básica de algodão 100%, ideal para o dia a dia. Confortável e versátil.', 49.90, true, true),
('Calça Jeans Skinny', 'calca-jeans-skinny', 'VAREJO', 'Calça jeans skinny com elastano. Modelagem moderna e confortável.', 129.90, true, true),
('Blusa Social Branca', 'blusa-social-branca', 'ATACADO', 'Blusa social em tecido de alta qualidade. Perfeita para revenda.', 35.00, false, true),
('Kit Uniforme Empresarial', 'kit-uniforme-empresarial', 'UNIFORME', 'Kit completo de uniforme empresarial personalizado. Inclui camisa, calça e acessórios. Sob consulta para personalização.', NULL, false, true),
('Vestido Floral', 'vestido-floral', 'VAREJO', 'Vestido estampado com flores. Modelo solto e confortável para o verão.', 89.90, true, true),
('Polo Masculina', 'polo-masculina', 'ATACADO', 'Polo masculina em cores variadas. Ideal para atacado e revenda.', 42.00, true, true);

-- Inserir imagens de exemplo (usando URLs placeholder - substitua por imagens reais)
-- Nota: Você precisará fazer upload de imagens reais através do admin ou Supabase Storage

-- Para produtos reais, você fará upload das imagens através do painel admin.
-- Este é apenas um exemplo de como os dados seriam estruturados.

-- Exemplo de como inserir imagens (após fazer upload no storage):
-- INSERT INTO product_images (product_id, url, position) VALUES
-- ((SELECT id FROM products WHERE slug = 'camiseta-basica-preta'), 'https://seu-projeto.supabase.co/storage/v1/object/public/product-images/camiseta.jpg', 0);
