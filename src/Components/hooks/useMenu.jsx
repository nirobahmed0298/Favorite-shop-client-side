import React, { useEffect, useState } from 'react';
import UseAxisosPublic from './UseAxisosPublic';
import { useQuery } from '@tanstack/react-query';

const useMenu = () => {
    let axiosPublic = UseAxisosPublic()
    const { data: menu = [], isPending: loading, refetch } = useQuery({
        queryKey: ['menu'],
        queryFn: async () => {
            let res = await axiosPublic.get(`/menu`)                               
            return res.data;
        }
    })
    return [menu, loading, refetch]
};

export default useMenu;