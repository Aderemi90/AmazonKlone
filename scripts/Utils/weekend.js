
    function weekend(){
        
        const today = dayjs();
        let addedDays = 0;
        const deliveryDays = 5
        let currentDay = today;

        while (addedDays < deliveryDays){
            currentDay = currentDay.add(1, 'day');
            const dayOfWeek = currentDay.day();

            if (dayOfWeek === 0 || dayOfWeek === 6){
                continue;
            }
            addedDays++
        }
        console.log(currentDay)
        
    }