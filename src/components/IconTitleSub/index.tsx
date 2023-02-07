import React, { ReactElement } from 'react'

interface props {
	icon: React.ReactNode
	title: string
	subTitle: string
}

export const IconTitleSub = ({
	icon,
	title,
	subTitle,
}: props): ReactElement => {
	return (
		<div className='flex items-center gap-4 text-white py-1'>
			{icon}
			<div className='flex flex-col gap-0 text-sm'>
				<span>{title}</span>
				<span>{subTitle}</span>
			</div>
		</div>
	)
}
