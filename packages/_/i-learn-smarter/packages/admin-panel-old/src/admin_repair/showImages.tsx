import * as React from 'react'

import { clickImage } from './actions'

export class ShowImages extends React.Component<AdminRepairProps, {}> {
  private base: string
  constructor(props: AdminRepairProps) {
    super(props)
    this.base = 'adminrepair'
  }
  public render() {
    return <div className={`${this.base}__images`}>
      <div className={`${this.base}__images--container`}>
        {
          this.props.adminRepairStore.images
            .map((singleImage: any, i: number) => {
              return <div key={i}>
                <img
                  src={singleImage.thumbSrc}
                  onClick={() => this.props.dispatch(clickImage(singleImage))}
                />
              </div>
            })
        }
      </div>
    </div>
  }
}
