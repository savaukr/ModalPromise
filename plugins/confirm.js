$.confirm = function(options) {
	return new Promise((resolve, reject) => {
		const modal = $.modal({
			title: options.title,
			closable:false,
			width:'400px',
			content: options.content,
			onClose(){
				modal.destroy()
			},
			footerButtons: [
			  	{text:'Відмінити', type:'secondary', handler: ()=>{
			  		console.log('secondary btn clicked')
			  		reject()
			  		modal.close()
			  	}},
			  	{text:'Видалити', type:'danger', handler: ()=>{
			  		console.log('danger btn clicked')
			  		resolve()
			  		modal.close()
			  	}}
			  ]
		})
		setTimeout(()=> modal.open(), 100)
	})
}