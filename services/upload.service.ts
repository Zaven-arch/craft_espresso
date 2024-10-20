/* eslint-disable no-undef */

import { SupabaseClient, createClient } from '@supabase/supabase-js'

import { v4 as uuid } from 'uuid'
import { FileExtension, FileType } from '~/enums'

export class UploadService {
  private BUCKET_NAME = 'images'

  private dbUrl: string

  private supabaseKey: string

  private supabase: SupabaseClient

  constructor() {
    const {
      public: { dbUrl, supabaseKey },
    } = useRuntimeConfig()

    this.dbUrl = dbUrl
    this.supabaseKey = supabaseKey
    this.supabase = createClient(this.dbUrl, this.supabaseKey)

    this.save = this.save.bind(this)
    this.remove = this.remove.bind(this)
  }

  async save(file: File) {
    const fileType: string | undefined = Object
      .entries(FileType)
      .find((item) => item[1] === file.type)?.[0]

    const { data, error } = await this.supabase.storage
      .from(this.BUCKET_NAME)
      .upload(`${uuid()}__${Date.now().toString(16)}${FileExtension[fileType as keyof typeof FileExtension]}`, file)

    if (error) {
      throw error
    }

    return data
  }

  async remove(files: string[]) {
    const { data, error } = await this.supabase.storage
      .from(this.BUCKET_NAME)
      .remove(files)

    if (error) {
      throw error
    }

    return data
  }
}
