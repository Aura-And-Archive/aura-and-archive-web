import { createClient } from '@/lib/supabase/client';

export type MediaType = 'audio' | 'image' | 'video';

export async function uploadMedia(file: File | Blob, type: MediaType, customFileName?: string) {
  const supabase = createClient();
  
  const ext = file.type.split('/')[1]?.split(';')[0] || (type === 'audio' ? 'webm' : 'bin');
  const fileName = customFileName || `${type}_${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${ext}`;
  const filePath = `${type}/${fileName}`;

  const { data, error } = await supabase.storage
    .from('media')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
      contentType: file.type || (type === 'audio' ? 'audio/webm' : undefined),
    });

  if (error) {
    throw new Error(`Upload failed: ${error.message}`);
  }

  const { data: { publicUrl } } = supabase.storage
    .from('media')
    .getPublicUrl(filePath);

  return { path: data.path, publicUrl };
}
