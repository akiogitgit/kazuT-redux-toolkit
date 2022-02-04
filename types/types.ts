export interface Rocket {
  id: string
  name: string
  mass: {
    kg: number
  }
  height: {
    meters: number
  }
  diameter: {
    meters: number
  }
}

export interface News {
  id: string
  content: string
  created_at: string
}

export interface EditNews {
  id: string
  content: string
}

export interface Task {
  id: string
  title: string
  created_at: string
  user_id: string
}

export interface EditTask {
  id: string
  title: string
}
