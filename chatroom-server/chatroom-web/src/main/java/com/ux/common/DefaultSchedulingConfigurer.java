package com.ux.common;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.SchedulingException;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.SchedulingConfigurer;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
import org.springframework.scheduling.config.ScheduledTaskRegistrar;
import org.springframework.scheduling.config.TriggerTask;
import org.springframework.stereotype.Component;

import java.lang.reflect.InvocationTargetException;
import java.util.Date;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ScheduledFuture;

import org.apache.commons.beanutils.BeanUtils;



@Component
public class DefaultSchedulingConfigurer implements SchedulingConfigurer {
    private final String FIELD_SCHEDULED_FUTURES = "scheduledFutures";
    private ScheduledTaskRegistrar taskRegistrar;
    @Autowired
    private ThreadPoolTaskScheduler taskExecutor;
    private Set<ScheduledFuture<?>> scheduledFutures = null;
    private Map<String, ScheduledFuture<?>> taskFutures = new ConcurrentHashMap<String, ScheduledFuture<?>>();

    @Override
    public void configureTasks(ScheduledTaskRegistrar taskRegistrar) {
        this.taskRegistrar = taskRegistrar;
    }

  @SuppressWarnings("unchecked")
    private Set<ScheduledFuture<?>> getScheduledFutures() {
        if (scheduledFutures == null) {
            try {
                scheduledFutures = (Set<ScheduledFuture<?>>) BeanUtils.getProperty(taskRegistrar, FIELD_SCHEDULED_FUTURES);
            } catch (NoSuchFieldException | IllegalAccessException | InvocationTargetException | NoSuchMethodException e) {
                throw new SchedulingException("not found scheduledFutures field.");
            }
        }
        return scheduledFutures;
    }


    public void addTriggerTask(String taskId, TriggerTask triggerTask) {
        if (taskFutures.containsKey(taskId)) {
            throw new SchedulingException("the taskId[" + taskId + "] was added.");
        }
        TaskScheduler scheduler = taskRegistrar.getScheduler();
//        ScheduledFuture<?> future = taskExecutor.schedule(triggerTask.getRunnable(), triggerTask.getTrigger());
        ScheduledFuture<?> future = taskExecutor.schedule(triggerTask.getRunnable(), triggerTask.getTrigger());
//        getScheduledFutures().add(future);
        taskFutures.put(taskId, future);
    }


    public void addTriggerTaskOneTime(Date date, Runnable runnable) {
//        TaskScheduler scheduler = taskRegistrar.getScheduler();
        System.out.println("任务将在"+date+"时执行");
        try {
            Thread.sleep(100);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        ScheduledFuture<?> future = taskExecutor.schedule(runnable, date);
    }

*
     * 取消任务
     *
     * @param taskId


    public void cancelTriggerTask(String taskId) {
        ScheduledFuture<?> future = taskFutures.get(taskId);
        if (future != null) {
            future.cancel(true);
        }
        taskFutures.remove(taskId);
//        getScheduledFutures().remove(future);
    }

*
     * 重置任务
     *
     * @param taskId
     * @param triggerTask


    public void resetTriggerTask(String taskId, TriggerTask triggerTask) {
        cancelTriggerTask(taskId);
        addTriggerTask(taskId, triggerTask);
    }

*
     * 任务编号
     *
     * @return


    public Set<String> taskIds() {
        return taskFutures.keySet();
    }

*
     * 是否存在任务
     *
     * @param taskId
     * @return


    public boolean hasTask(String taskId) {
        return this.taskFutures.containsKey(taskId);
    }

*
     * 任务调度是否已经初始化完成
     *
     * @return


    public boolean inited() {
        return this.taskRegistrar != null && this.taskRegistrar.getScheduler() != null;
    }
}
